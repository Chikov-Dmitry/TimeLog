import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginUserRequestDto } from './dto/LoginUser.request.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/Auth.response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(dto: CreateUserDto): Promise<AuthResponseDto> {
    const candidate = await this.userService.findUserByEmail(dto.email);
    if (candidate)
      throw new BadRequestException(
        `Пользователь c email ${dto.email} уже существует`,
      );
    const user = await this.userService.create(dto);
    return new AuthResponseDto(user);
  }

  async loginUser(dto: LoginUserRequestDto): Promise<AuthResponseDto> {
    const candidate = await this.userService.findUserByEmail(dto.email);
    if (!candidate)
      throw new BadRequestException(
        `Пользователь c email ${dto.email} не найден`,
      );
    const validatePassword = await bcrypt.compare(
      dto.password,
      candidate.password,
    );
    if (!validatePassword) throw new BadRequestException('Не верные данные');
    return new AuthResponseDto(candidate);
  }
}
