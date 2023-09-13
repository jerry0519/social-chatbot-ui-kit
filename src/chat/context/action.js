import { fetchStream } from "../service";

export default function action(state, dispatch) {
  const setState = (payload = {}) =>
    dispatch({
      type: "SET_STATE",
      payload: { ...payload },
    });
  return {
    setState,
    clearTypeing() {
      console.log("clear");
      setState({ typeingMessage: {} });
    },
    async sendMessage() {
      const { typeingMessage, options, chat, is, currentChat } = state;
      if (typeingMessage?.content) {
        const newMessage = {
          ...typeingMessage,
          sentTime: Date.now(),
        };
        const messages = [...chat[currentChat].messages, newMessage];
        let newChat = [...chat];
        newChat.splice(currentChat, 1, { ...chat[currentChat], messages });
        setState({
          is: { ...is, thinking: true },
          typeingMessage: {},
          chat: newChat,
        });
        const controller = new AbortController();
        try {
          const res = await fetchStream({
            messages: messages.map((item) => {
              const { sentTime, id, ...rest } = item;
              return { ...rest };
            }),
            options: options.openai,
            signal: controller.signal,
            onMessage(content) {
              newChat.splice(currentChat, 1, {
                ...chat[currentChat],
                messages: [
                  ...messages,
                  {
                    content,
                    role: "assistant",
                    sentTime: Date.now(),
                    id: Date.now(),
                  },
                ],
              });
              setState({
                is: { ...is, thinking: content.length },
                chat: newChat,
              });
            },
            onStar() {},
            onEnd() {
              setState({
                is: { ...is, thinking: false },
              });
            },
            onError(res) {
              console.log(res);
              const { error } = res || {};
              if (error) {
                newChat.splice(currentChat, 1, {
                  ...chat[currentChat],
                  error,
                });
                setState({
                  chat: newChat,
                  is: { ...is, thinking: false },
                });
              }
            },
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    },

    newChat() {
      const { chat } = state;
      const chatList = [
        ...chat,
        {
          title: "This is a New Conversations",
          id: Date.now(),
          messages: [],
          ct: Date.now(),
          icon: [2, "files"],
        },
      ];
      setState({ chat: chatList, currentChat: chatList.length - 1 });
    },

    modifyChat(arg, index) {
      const chat = [...state.chat];
      chat.splice(index, 1, { ...chat[index], ...arg });
      setState({ chat, currentEditor: null });
    },

    editChat(index, title) {
      const chat = [...state.chat];
      chat.splice(index, 1, [...chat[index], title]);
      setState({
        chat,
      });
    },
    removeChat(index) {
      const chat = [...state.chat];
      chat.splice(index, 1);
      const payload =
        state.currentChat === index
          ? { chat, currentChat: index - 1 }
          : { chat };
      setState({
        ...payload,
      });
    },

    setMessage(content) {
      const typeingMessage =
        content === ""
          ? {}
          : {
              role: "user",
              content,
              id: D