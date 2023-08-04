import { IUserResponseDto } from "../dtoInterface/IUser.response.dto";

interface IUserOnline extends IUserResponseDto {
  onWork: boolean;
}
export type UserOnlineDto = IUserOnline[];
