import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginUserRequestDto } from './dto/LoginUser.request.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/Auth.response.dto';
import { TokenService } from '../token/token.service';
import { LogoutUserRequestDto } from './dto/LogoutUser.request.dto';
import { TokenPayloadDto } from '../token/dto/TokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<AuthResponseDto> {
    const candidate = await this.userService.findUserByEmail(dto.email);
    if (candidate)
      throw new BadRequestException(
        `Пользователь c email ${dto.email} уже существует`,
      );
    const user = await this.userService.create(dto);
    const deviceId = dto.deviceId;
    const { id, name, surname, patronymic, email } = user;

    const payload = new TokenPayloadDto({
      id,
      name,
      surname,
      patronymic,
      email,
      deviceId,
    });
    const tokens = this.tokenService.generateToken(payload);

    await this.tokenService.saveToken(
      user.id,
      dto.deviceId,
      tokens.refreshToken,
    );

    return new AuthResponseDto({
      id,
      name,
      surname,
      patronymic,
      email,
      tokens,
    });
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
    const deviceId = dto.deviceId;
    const { id, name, surname, patronymic, email } = candidate;

    const payload = new TokenPayloadDto({
      id,
      name,
      surname,
      patronymic,
      email,
      deviceId,
    });
    const tokens = this.tokenService.generateToken(payload);

    await this.tokenService.saveToken(
      candidate.id,
      deviceId,
      tokens.refreshToken,
    );

    return new AuthResponseDto({
      id,
      name,
      surname,
      patronymic,
      email,
      tokens,
    });
  }

  async logout(dto: LogoutUserRequestDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    await this.tokenService.removeToken(user.id, dto.deviceId);
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
    deviceId: string,
  ): Promise<AuthResponseDto> {
    const isValid = this.tokenService.validateRefreshToken(refreshToken);
    if (!isValid) throw new UnauthorizedException();

    const dbToken = await this.tokenService.findTokenByDeviceId(
      userId,
      deviceId,
    );
    if (!dbToken) throw new NotFoundException('Токен не найден в базе данных');

    if (dbToken !== refreshToken)
      throw new UnauthorizedException('Указанные токены не совпадают');

    const user = await this.userService.findOne(userId);

    const { id, name, surname, patronymic, email } = user;

    const tokens = this.tokenService.generateToken({
      name,
      id,
      surname,
      patronymic,
      email,
      deviceId,
    });

    await this.tokenService.saveToken(userId, deviceId, tokens.refreshToken);

    return { id, name, surname, patronymic, email, tokens };
  }
}
