import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import config from 'config'
//Allows you to create json files
import logger from '../utils/logger';
import {version} from "../package.json";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin: corsOrigin, 
        credentials:true,
    }
});

app.get('/', (req,res)=>{
res.send('Hello');
});

httpServer.listen(port, host,()=> {
    logger.info(`🚀 Server version ${version} is listening 🚀`)
    logger.info(`http://${host}:${port}`)
});