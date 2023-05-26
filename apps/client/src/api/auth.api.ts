import { AxiosResponse } from 'axios'
import {
  IAuthUserResponseDto,
  ICreateUserRequestDto,
  ILoginUserRequestDto,
  ILogoutUserRequestDto
} from '@timelog/interfaces'
import ApiInstance from '@/api/index'

export default class AuthApi {
  static async login(payload: ILoginUserRequestDto): Promise<AxiosResponse<IAuthUserResponseDto>> {
    return ApiInstance.post<IAuthUserResponseDto>('/auth/login', payload)
  }

  static async logout(payload: ILogoutUserRequestDto): Promise<AxiosResponse> {
    return ApiInstance.post('auth/logout', payload)
  }

  static async registration(
    payload: ICreateUserRequestDto
  ): Promise<AxiosResponse<IAuthUserResponseDto>> {
    return ApiInstance.post<IAuthUserResponseDto>('/auth/register', payload)
  }

  static async refresh(): Promise<AxiosResponse<IAuthUserResponseDto>> {
    return ApiInstance.get('/auth/refresh')
  }
}
