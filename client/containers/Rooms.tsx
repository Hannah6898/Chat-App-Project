import { useSockets } from "../context/socket.context";
import styles from "../styles/Room.module.css";
import { useRef } from "react";
import EVENTS from "../config/events";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) return;
    //emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    //set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key) {
    if (key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    console.log("joined room")
  }

  return (
    <div className={styles.container}>
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input placeholder="Chat name" ref={newRoomRef} />
        <button className="cta" onClick={handleCreateRoom}>START NEW CHAT</button>
      </div>

      <ul className={styles.roomList}>
      {Object.keys(rooms).map((key) => {
        return (
          <div key={key}>
            <div className={styles.buttonWrapper}>
              <img src={"../public/user.png"}></img>
            <button
              disabled={key === roomId}
              title={`Join ${rooms[key].name}`}
              onClick={() => handleJoinRoom(key)}
            >
              {rooms[key].name}
            </button>
            </div>
          </div>
        );
      })}
      </ul>
    </nav>
    </div>
  );
}

export default RoomsContainer;
