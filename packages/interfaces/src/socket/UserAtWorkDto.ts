import { IUserResponseDto } from "../dtoInterface/IUser.response.dto";

interface IUserAtWork extends IUserResponseDto {
  online: boolean;
}
export type UserAtWorkDto = IUserAtWork[];
