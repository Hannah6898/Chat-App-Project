import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSockets } from "../context/socket.context";
import MessagesContainer from "../containers/Messages";
import RoomsContainer from "../containers/Rooms";
import { useEffect, useRef } from "react";
import LandingPageImg from "../public/LandingPageImg.jpeg";

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

  useEffect(()=>{
    if(usernameRef){
      usernameRef.current.value = localStorage.getItem('username') || ''
    }
  },[])

  return (
      <div >
      {!username && (
        <div className={styles.homeContainer}>
        <img src={"../public/LandingPageImg.jpeg"}></img>
        <div className={styles.heading}>WhatsApp for Desktop</div>
        <br/>
        <div>Send and receive messages without keeping your phone online.</div>
        <div>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</div>
        <br/>
        <div className={styles.headingTwo}>Sign In</div>
        <br/>
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
          <input placeholder="Username" ref={usernameRef} className={styles.input}></input>
          <button onClick={handleSetUsername}>START</button>
        </div>
        </div>
        </div>
      )}

      {username && (
        <div className={styles.roomMessageContainer}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
      </div>
  );
}
