import {Server, Socket} from "socket.io";
import logger from '../utils/logger'
import {nanoid} from "nanoid";

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
    }
}

const rooms: Record<string, {name:string}> = {}

function socket({io}: {io: Server}){
    logger.info(`Sockets enabled`)
    io.on(EVENTS.connection, (socket:Socket)=>{
        logger.info(`User connnected ${socket.id}`)
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName})=>{
            console.log({roomName})
            //create roomID
            const roomID = nanoid();
            //Add a new room to rooms object 
            rooms[roomID]={
                name:roomName
            }
            //Join the room
            socket.join(roomID)
            //Broadcast and event saying there is a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            //emit back to the room creator with all the rooms 
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
            //emit event back to room creator saying they have joined a room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID)
        })
    })

};

export default socket;