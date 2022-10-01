import { useSockets } from "../context/socket.context";
import { useRef } from "react";
import EVENTS from "../config/events"

function RoomsContainer() {

    const {socket, roomId, rooms} = useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom(){
        //get the room name 
        const roomName = newRoomRef.current.value || ''
        if (!String(roomName).trim()) return;
        //emit room created event 
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
        //set room name input to empty string
        newRoomRef.current.value = "";
    }

    return (<nav>

        <div>
            <input placeholder="Chat name" ref={newRoomRef}/>
            <button onClick={handleCreateRoom}>START NEW CHAT</button>
        </div>

        {Object.keys(rooms).map((key)=>{
            return(<div key={key}>{rooms[key].name}</div>)
        }
        )}




    </nav>);
}

export default RoomsContainer;