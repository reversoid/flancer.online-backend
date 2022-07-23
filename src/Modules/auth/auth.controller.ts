import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/CreateUser.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/Dto/LoginUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async registration(
    @Body() userData: CreateUserDto,
    @RealIP() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access, refresh } = await this.authService.registration(userData, {
      ip,
    });
    res.cookie('access_token', access, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 15,
      path: '/api/orders',
    });

    res.cookie('refresh_token', refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 60 * 24 * 60,
      path: '/api/auth/refresh',
    });

    return { success: true };
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() userData: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(userData);
    res.cookie('Authorization', access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 15,
      path: '/api/orders',
    });
    return {
      success: true,
    };
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
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
