import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginUserRequestDto } from './dto/LoginUser.request.dto';
import { AuthResponseDto } from './dto/Auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserRequestDto): Promise<AuthResponseDto> {
    return this.authService.loginUser(dto);
  }
}
