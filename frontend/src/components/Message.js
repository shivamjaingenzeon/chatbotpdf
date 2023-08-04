import React, { useEffect, useRef } from "react";
import "../css/Message.css";
import bot from "../images/bot.png";
import user from "../images/user.png";
export default function Message(props) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  return (
    <div className={`${props.id}message `} ref={ref}>
      <div className="messageInfo">
        <img className="chatimg" src={`${props.id}` === "bot" ? bot : user} />
      </div>

      <div className="messageContent">
        <p className={`${props.id}message-p`}>{props.message}</p>
      </div>
    </div>
  );
}
