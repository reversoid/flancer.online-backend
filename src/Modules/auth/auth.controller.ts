import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/CreateUser.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/Dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService) { }

    @Post('registration')
    registration(@Body() userData: CreateUserDto): any {
        return this.authService.registration(userData);
    }

    @Post('login')
    login(@Body() userData: LoginUserDto): any {
        return this.authService.login(userData);
    }

    @Post('logout')
    logout(): any {
        return this.authService.logout();
    }

    // just testing guards
    // TODO delete it later
    @UseGuards(JwtAuthGuard)
    @Post('protected')
    protected(): any {
        return this.authService.protected();
    }
}
