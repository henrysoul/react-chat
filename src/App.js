import React, { useEffect, useState } from "react";
import "./App.css";
import ChatLeft from "./components/chat_left/ChatLeft";
import ChatRight from "./components/chat_right/ChatRight";
import MessageInput from "./components/message_input/MessageInput";
function App() {
  const [msg, setMsg] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [msgError, setMsgError] = useState();
  const [hasName, setHasName] = useState(false);
  const [mesgs, setMessages] = useState([]);

  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    setMessages(messages);
  });

  const inputChangeHandler = (e) => {
    setError(false);
    const val = e.target.value;
    val && setName(e.target.value);
  };

  const msgChangeHandler = (e) => {
    setMsgError(false);
    setMsg(e.target.value);
  };

  const nameSubmitHandler = () => {
    // check if name was typed
    if (name) {
      const names = JSON.parse(localStorage.getItem("names"));
      // check if name key already exists in localStorage
      if (names) {
        // check if the input name already exists in localStorage names
        if (names.includes(name)) {
          setError(true);
          return;
        }
        // update local storage with new name
        localStorage.setItem("names", JSON.stringify([...names, name]));
        setHasName(true);
      } else {
        // update localStorage with new name
        localStorage.setItem("names", JSON.stringify([name]));
        setHasName(true);
      }
    }
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
    <div>
      {!hasName && (
        // show name input if name is null
        <div className="container justify-center m-auto m-5">
          <div className="form-group pt-5">
            <label className="pb-2">Enter your name</label>
            {error && <p>The name entered already exists</p>}
            <input
              name="name"
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <button className="btn btn-primary mt-5" onClick={nameSubmitHandler}>
            Submit
          </button>
        </div>
      )}
      {hasName && (
        // show messages message input if name is not empty
        <>
          <div className="main-chat m-auto pb-5 mb-5">
            <div className="all-chats">
              <label>Message</label>
              <input
                name="message"
                onChange={msgChangeHandler}
                value={msg || ""}
              />
              <button onClick={sendMessageHandler}>Send</button>
              {mesgs.map((el) => {
                let res;
                el.name === name
                  ? (res = <ChatRight>{el.message}</ChatRight>)
                  : (res = <ChatLeft>{el.message}</ChatLeft>);

                return res;
              })}
            </div>
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default App;
