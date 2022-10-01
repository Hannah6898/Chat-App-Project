import Head from "next/head";
import Image from "next/image";
import { useSockets } from "../context/socket.context";
import MessagesContainer from "../containers/Messages";
import RoomsContainer from "../containers/Rooms";
import { useRef } from "react";

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }
    setUsername(value);
    localStorage.setItem("username", value);
  }

  return (
    <div>
      {!username && (
        <div className="usernameWrapper">
          <div className="usernameInner">
          <input placeholder="Username" ref={usernameRef}></input>
          <button onClick={handleSetUsername}>START</button>
        </div>
        </div>
      )}

      {username && (
        <div className="container">
          <MessagesContainer />
          <RoomsContainer />
        </div>
      )}
    </div>
  );
}
