import { useSockets } from "../context/socket.context";
import { useRef, useEffect } from "react";
import EVENTS from "../config/events";
import styles from "../styles/Messages.module.css";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  if (!roomId) {
    return <div />;
  }

  function handleSendMessage() {
    const message = newMessageRef.current.value;
    if (!String(message).trim) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();
    //Set Messages so the person who sent the message will also see
    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}: ${date.getMinutes()}`,
      },
    ]);
    newMessageRef.current.value = "";
  }

  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  if (!roomId) {
    return <div />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
        <div className={styles.messageBox}>
          <textarea
            rows={1}
            placeholder="Type a message"
            ref={newMessageRef}
          ></textarea>
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
