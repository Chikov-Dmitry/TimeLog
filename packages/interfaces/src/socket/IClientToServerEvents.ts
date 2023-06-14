import { UserOnlineDto } from "./UserOnlineDto";

export interface IClientToServerEvents {
  getOnlineList: (cb: (list: UserOnlineDto) => void) => void;
}
