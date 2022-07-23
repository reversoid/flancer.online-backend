import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/CreateUser.dto';

import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/Dto/LoginUser.dto';
import { UserService } from 'src/Database/users/users.service';
import { TokenService } from 'src/Database/users/token.service';
import { IUserMetadata } from 'src/Database/users/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,

    private jwtService: JwtService,
  ) {}

  async registration(
    userData: CreateUserDto,
    _userMetadata: IUserMetadata,
  ) {
    const user = await this.userService.registration(userData);
    const tokens = await this.tokenService.createTokens(user._id, _userMetadata);

    return tokens;
  }

  async login(userData: LoginUserDto) {
    const user = await this.userService.login(userData);

    const tokens = await this.tokenService.setNewTokens(user._id);
    return tokens;
  }

  logout(): any {
    return 'you logged out';
  }

  getUsers() {
    return this.userService.getUsers();
  }

  protected(): any {
    return 'hi this is protected section';
  }
}
