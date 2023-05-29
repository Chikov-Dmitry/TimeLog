import {UserIdsOnlineDto} from "./UserIdsOnline.dto";

export interface IServerToClientEvents {
    onlineList: (list: UserIdsOnlineDto)=>void,
    log: (log: string)=>void
}