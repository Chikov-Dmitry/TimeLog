import {UserIdsOnlineDto} from "./UserIdsOnline.dto";

export interface IClientToServerEvents {
    getOnlineList: (cb: (list: UserIdsOnlineDto)=>void) => void;
}