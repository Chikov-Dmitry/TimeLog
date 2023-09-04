import { UserOnlineDto } from "./UserOnlineDto";
import { UserAtWorkDto } from "./UserAtWorkDto";

export interface IServerToClientEvents {
  onlineList: (list: UserOnlineDto) => void;
  atWorkList: (list: UserAtWorkDto) => void;
  log: (log: string) => void;
}
