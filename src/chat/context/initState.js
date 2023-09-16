export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: "Generate useLocalStorage",
      id: 321123123,
      ct: "2023-12-12",
      messages: [
        {
          content: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "1682827639323",
          role: "user",
          id: 123,
        },
      ],
    },
    {
      title: "Generate a React hooks  useLocalStorage",
      ct: "2023-12-12",
      id: 92839,
      messages: [
        {
          id: 1682511616366,
          sentTime: "1682827639313",
          role: "user",
          content: "React写一个Modal组件\n",
        },
        {
          id: 1682511616366,
          sentTime: "1681827632313",
          role: "assistant",
          content:
            '以下是一个简单的React Modal组件示例：\n\n```jsx\nimport React, { useState } from \'react\';\n\nconst Modal = ({ isOpen, onClose, children }) => {\n  const [isModalOpen, setIsModalOpen] = useState(isOpen);\n\n  const handleClose = () => {\n    setIsModalOpen(false);\n    onClose();\n  };\n\n  return (\n    <>\n      {isModalOpen && (\n        <div className="modal">\n          <div className="modal-content">\n            <span className="close" onClick={handleClose}>\n              &times;\n            </span>\n            {children}\n          </div>\n        </div>\n      )}\n    </>\n  );\n};\n\nexport default Modal;\n```\n\n在