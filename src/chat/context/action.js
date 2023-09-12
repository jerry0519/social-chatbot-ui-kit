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
         