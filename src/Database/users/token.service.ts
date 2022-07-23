import { Injectable } from '@nestjs/common';
import { IUserMetadata } from './types';

@Injectable()
export class TokenService {
  /**
   * Creates tokens for new user
   **/
  async createTokens(userId: string, userMetadata: IUserMetadata) {
    //check for user does not exist, otherwise error
    // TODO create access token, refreshToken,
    // create a record in db about refresh token and its ip and fingerprint
    return {
      access: '1',
      refresh: '2',
    };
  }

  /**
   * Updates tokens for the user
   **/
  async updateTokens(userId: string) {
    //check for user is available to update tokens
    // if (ip or fingerprint match; and current refresh token match; otherwise error)
    // update record in database
    return {
      access: '4',
      refresh: '4',
    };
  }

  /**
   * Set and update new tokens after login
   **/
  async setNewTokens(userId: string) {
    return {
        access: '5',
        refresh: '5',
      };
  }
}
