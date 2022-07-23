import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/CreateUser.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/Dto/LoginUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe({ transform: true }))
  registration(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() userData: LoginUserDto) {
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
