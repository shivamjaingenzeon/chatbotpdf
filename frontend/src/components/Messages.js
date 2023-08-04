import React from "react";
import "../css/Message.css";
import "../css/Messages.css";
import Message from "./Message";
import { useAppStore } from "./appStore";
export default function Messages() {
  const msgList = useAppStore((state) => state.msgList);

  return (
    <div className="messages" style={{ backgroundColor: " #f4f3f8" }}>
      {msgList.map((obj) => (
        <Message message={obj.message} id={obj.id}></Message>
      ))}
    </div>
  );
}
