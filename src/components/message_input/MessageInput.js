import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MessageInput.css";

export default function MessageInput() {
  const { name } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState();
  const [msgError, setMsgError] = useState();
  const msgChangeHandler = (e) => {
    setMsgError(false);
    setMsg(e.target.value);
  };

  const sendMessageHandler = () => {
    // chack if message is entered
    if (msg) {
      // update message if messages exists in localStorage else add new messages with input message
      const messages = JSON.parse(localStorage.getItem("messages"));
      if (messages) {
        localStorage.setItem(
          "messages",
          JSON.stringify([...messages, { name: name, message: msg }])
        );
      } else {
        localStorage.setItem(
          "messages",
          JSON.stringify([{ name: name, message: msg }])
        );
      }
      setMsg("");
    } else {
      setMsgError(true);
    }
  };

  return (
    // <label>Message</label>
    //           <input
    //             name="message"
    //             onChange={msgChangeHandler}
    //             value={msg || ""}
    //           />
    //           <button onClick={sendMessageHandler}>Send</button>
    <footer className="fixed-bottom p-2">
      <div className="container align-center m-auto">
        <input
          type="text"
          placeholder="type here"
          className="input"
          onChange={msgChangeHandler}
          value={msg || ""}
        />
        <button
          className="btn btn-light"
          type="submit"
          onClick={sendMessageHandler}
        >
          send
        </button>
      </div>
    </footer>
  );
}
