import { UserOnlineDto } from "./UserOnlineDto";
import { UserAtWorkDto } from "./UserAtWorkDto";

export interface IClientToServerEvents {
  getOnlineList: (cb: (list: UserOnlineDto) => void) => void;
  getAtWorkList: (cb: (list: UserAtWorkDto) => void) => void;
}
