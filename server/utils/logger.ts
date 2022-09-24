import logger from 'pino'
import dayjs from 'dayjs'

const log= logger({
    prettifier: true, 
    base:{
        pid:false
        //Will not print process id 
    },
    timestamp: ()=>`,"time":"${dayjs().format()}"`,
});

export default log;