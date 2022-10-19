import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService, LoginUserDTO, RegisterDTO } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RealIP } from 'nestjs-real-ip';
import { REFRESH_TOKEN_OPTIONS } from './utils/authTokenOptions';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registration(
    @RealIP() ip: string,
    @Body() userData: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id } = await this.authService.register(userData);
    const { access, refresh } = await this.authService.getTokens(id);

    res.cookie('refresh_token', refresh, REFRESH_TOKEN_OPTIONS);

    return { access_token: access};
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() { emailOrPhone, password }: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id } =  await this.authService.validateUser(emailOrPhone, password);
    const { access, refresh } = await this.authService.getTokens(id);

    res.cookie('refresh_token', refresh, REFRESH_TOKEN_OPTIONS);
    
    return { access_token: access};
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ) {

    res.clearCookie('refresh_token');
    return {
      success: true,
    };
  }

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() request: Request,
  ) {
    const jwt = request.cookies['refresh_token'];
    
    try {
      const {access, refresh} = await this.authService.updateTokens(jwt);

      res.cookie('refresh_token', refresh, REFRESH_TOKEN_OPTIONS);
  
      return {
        access_token: access
      };
    } catch (error) {
      res.clearCookie('refresh_token');
      throw error;
    }
  }
}
