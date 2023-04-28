import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from './dto/tokens.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { TokenPayloadDto } from './dto/TokenPayload.dto';

@Injectable()
export class TokenService {
  @InjectModel(Token.name) private model: Model<TokenDocument>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(user: TokenPayloadDto): TokensDto {
    const payload = { user };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.access_secret'),
      expiresIn: this.configService.get('jwt.access_expiresIn'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refresh_secret'),
      expiresIn: this.configService.get('jwt.refresh_expiresIn'),
    });
    return { accessToken, refreshToken };
  }

  async findTokenByUserId(userId: string) {
    return this.model.findOne({ user: userId });
  }

  async findTokenByDeviceId(userId: string, deviceId: string) {
    const document = await this.model.findOne(
      {
        user: userId,
        'tokens.deviceId': deviceId,
      },
      { _id: 0, 'tokens.$': 1 },
    );
    return document?.tokens[0]?.refreshToken;
  }

  async saveToken(userId: string, deviceId: string, refreshToken: string) {
    const tokenById = await this.findTokenByUserId(userId);
    if (!tokenById) {
      return this.model.insertMany([
        {
          user: userId,
          tokens: [{ deviceId: deviceId, refreshToken: refreshToken }],
        },
      ]);
    }
    const tokenByDeviceId = await this.findTokenByDeviceId(userId, deviceId);
    if (!tokenByDeviceId) {
      await this.model.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            tokens: { deviceId: deviceId, refreshToken: refreshToken },
          },
        },
      );
    } else {
      await this.model.findOneAndUpdate(
        { user: userId, 'tokens.deviceId': deviceId },
        {
          $set: {
            'tokens.$.refreshToken': refreshToken,
          },
        },
      );
    }
  }

  async removeToken(userId: string, deviceId: string) {
    await this.model.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          tokens: { deviceId: deviceId },
        },
      },
    );
  }

  async validateAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('jwt.access_secret'),
    });
  }

  async validateRefreshToken(token) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('jwt.refresh_secret'),
    });
  }
}
