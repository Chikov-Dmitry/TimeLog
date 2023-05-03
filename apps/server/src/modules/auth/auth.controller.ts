import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserRequestDto } from './dto/LoginUser.request.dto';
import { LogoutUserRequestDto } from './dto/LogoutUser.request.dto';
import { PublicEndPoint } from '../../common/decorators/PublicEndPoint.decorator';
import { Response } from 'express';
import { RefreshTokenGuard } from '../../common/guards/refreshToken.guard';
import { ApiTags } from '@nestjs/swagger';
import {SameUser} from "../../common/decorators/sameUser.decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicEndPoint()
  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const authResponse = await this.authService.registerUser(dto);
    res.cookie('refreshToken', authResponse.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({ authResponse });
  }

  @PublicEndPoint()
  @Post('login')
  async login(@Body() dto: LoginUserRequestDto, @Res() res: Response) {
    const authResponse = await this.authService.loginUser(dto);
    res.cookie('refreshToken', authResponse.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({ authResponse });
  }
  @SameUser()
  @Post('logout')
  async logout(
    @Body() dto: LogoutUserRequestDto,
    @Req() req,
    @Res() res: Response,
  ) {

    await this.authService.logout(dto);

    res.clearCookie('refreshToken');
    return res.send();
  }

  @PublicEndPoint()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req, @Res() res: Response) {
    const user = req?.user?.user;
    if (!req.user) throw new BadRequestException();
    const { refreshToken } = req.cookies;
    const authResponse = await this.authService.refreshTokens(
      user.id,
      refreshToken,
      user.deviceId,
    );
    res.cookie('refreshToken', authResponse.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({ authResponse });
  }
}
