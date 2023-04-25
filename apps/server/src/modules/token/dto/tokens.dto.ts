import { IsDefined, IsJWT } from 'class-validator';

export class TokensDto {
  @IsJWT()
  @IsDefined()
  accessToken: string;

  @IsJWT()
  @IsDefined()
  refreshToken: string;
}
