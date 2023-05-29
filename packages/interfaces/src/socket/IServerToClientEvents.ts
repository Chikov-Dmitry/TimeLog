import {UserOnlineDto} from "./UserOnlineDto";

export interface IServerToClientEvents {
    onlineList: (list: UserOnlineDto)=>void,
    log: (log: string)=>void
}