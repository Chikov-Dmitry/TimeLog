import { AxiosResponse } from 'axios'
import {
  IAuthUserResponseDto,
  ICreateUserRequestDto,
  ILoginUserRequestDto
} from '@timelog/interfaces'
import ApiInstance from '@/api/index'

export default class AuthApi {
  static async login(payload: ILoginUserRequestDto): Promise<AxiosResponse<IAuthUserResponseDto>> {
    return ApiInstance.post<IAuthUserResponseDto>('/auth/login', payload)
  }

  static async registration(
    payload: ICreateUserRequestDto
  ): Promise<AxiosResponse<IAuthUserResponseDto>> {
    return ApiInstance.post<IAuthUserResponseDto>('/auth/register', payload)
  }
}
