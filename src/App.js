import React, { useEffect, useState } from "react";
import "./App.css";
import ChatLeft from "./components/chat_left/ChatLeft";
import ChatRight from "./components/chat_right/ChatRight";
import MessageInput from "./components/message_input/MessageInput";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [myName, setName] = useState();
  const [error, setError] = useState();
  const [mesgs, setMessages] = useState([]);
  const { name, addedMessage } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    setMessages(messages);
  }, [addedMessage]);

  setInterval(() => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    setMessages(messages);
  }, 1000);

  const inputChangeHandler = (e) => {
    setError(false);
    const val = e.target.value;
    val && setName(e.target.value);
  };

  const nameSubmitHandler = () => {
    // check if name was typed
    if (myName) {
      const names = JSON.parse(localStorage.getItem("names"));
      // check if name key already exists in localStorage
      if (myName) {
        // check if the input name already exists in localStorage names
        if (names.includes(myName)) {
          setError(true);
          return;
        }
        // update local storage with new name
        localStorage.setItem("names", JSON.stringify([...names, myName]));
        dispatch({ type: "SET_NAME", payload: myName });
      } else {
        // update localStorage with new name
        localStorage.setItem("names", JSON.stringify([myName]));
      }
    }
  };

  return (
    <div>
      {!name && (
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
      {name && (
        // show messages message input if name is not empty
        <>
          <div className="main-chat m-auto pb-5 mb-5">
            <div className="all-chats">
              {mesgs &&
                mesgs.map((el, i) => {
                  let res;
                  el.name === name
                    ? (res = <ChatRight key={i}>{el.message}</ChatRight>)
                    : (res = (
                        <ChatLeft key={i}>{`${el.name}=>${el.message}`}</ChatLeft>
                      ));

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
