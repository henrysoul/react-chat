import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MessageInput.css";

export default function MessageInput() {
  const { name } = useSelector((state) => state);
  const [msg, setMsg] = useState();
  const [msgError, setMsgError] = useState();
  const dispatch = useDispatch();
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
      dispatch({ type: "ADDED_MESSAGE" });
    } else {
      setMsgError(true);
    }
  };

  return (
    <footer className="fixed-bottom p-2">
      <div className="row container align-center m-auto">
        <div className="col-10">
          {" "}
          <input
            type="text"
            placeholder="type here"
            className="input"
            onChange={msgChangeHandler}
            value={msg || ""}
          />
        </div>
        <div className="col-2">
          {" "}
          <button
            className="btn btn-light"
            type="submit"
            onClick={sendMessageHandler}
          >
            send
          </button>
        </div>
      </div>
    </footer>
  );
}
