import { Injectable } from '@nestjs/common';
import { IUserMetadata } from './types';

@Injectable()
export class TokenService {
  async getTokens(userId: string, userMetadata: IUserMetadata) {
    // TODO create access token, refreshToken,
    // create a record in db about refresh token and its ip and fingerprint
    return {
      access: '1',
      refresh: '2',
    };
  }
}
