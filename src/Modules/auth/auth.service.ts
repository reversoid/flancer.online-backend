import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/CreateUser.dto';

import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/Dto/LoginUser.dto';
import { UserService } from 'src/Database/users/users.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private jwtService: JwtService,
        ) { }

    async registration(userData: CreateUserDto): Promise<{ access_token: string }> {
        const user = await this.userService.registration(userData);

        const payload = { email: user.email, id: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    // TODO create type of access_token object!
    async login(userData: LoginUserDto): Promise<{ access_token: string }> {
        const user = await this.userService.login(userData);

        const payload = { email: user.email, id: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    logout(): any {
        return 'you logged out'
    }

    getUsers() {
        return this.userService.getUsers();
    }

    protected(): any {
        return 'hi this is protected section'
    }
}
