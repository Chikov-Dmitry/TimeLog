import {ICreateUserRequestDto} from "./ICreateUser.request.dto";

export interface IAuthUserResponseDto extends Omit<ICreateUserRequestDto, 'password'>{}