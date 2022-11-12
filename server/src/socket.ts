import { Server, Socket } from "socket.io";
import logger from "../utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connnected ${socket.id}`);
    /*
     *When a user creates a new chat room
     */
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });
      //create roomID
      const roomID = nanoid();
      //Add a new room to rooms object
      rooms[roomID] = {
        name: roomName,
      };
      //Join the room
      socket.join(roomID);
      //Broadcast and event saying there is a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      //emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      //emit event back to room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID);
    });

    /*
     *When a user sends a message
     */
    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}: ${date.getMinutes()}`,
        });
      }
    );

    /*
     *When a user joins chat room 
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId)=>{
        socket.join(roomId)
        socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        console.log("room joined")
    })
  });
}

export default socket;
