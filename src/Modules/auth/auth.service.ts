import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: {
    first: string;
    last: string;
  };

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;
}

export class LoginUserDTO {
  @IsNotEmpty()
  emailOrPhone: string;

  @IsNotEmpty()
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async register({ email, name, password, phone }: RegisterDTO) {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', 409);
    }

    const userEntity = await new UserEntity({
      email,
      name,
      passwordHash: '',
      phone,
    }).setPassword(password);

    const newUser = await this.userRepository.createUser(userEntity);
    return { id: newUser._id };
  }

  public async validateUser(emailOrPhone: string, password: string) {
    // TODO make difference between email and phone
    const user = await this.userRepository.findUserByEmail(emailOrPhone);

    if (!user) {
      throw new HttpException('Неверный логин или пароль', 401);
    }
    const userEntity = new UserEntity(user);
    const isPasswordCorrect = await userEntity.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new HttpException('Неверный логин или пароль', 401);
    }

    return { id: user._id };
  }

  private _isEmail(str: string) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailPattern.test(str);
  }

  private _isPhone(str: string) {
    const phonePattern = /\d+/
    return str.length === 11 && phonePattern.test(str);
  }

  public async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }

  public async getTokens(id: string) {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync({ id }),
      this.jwtService.signAsync({ id }),
    ]);

    return {
      access,
      refresh,
    };
  }

  public async updateTokens(jwt: string) {
    try {
      await this.jwtService.verifyAsync(jwt);
      const { id } = <{id: string}>this.jwtService.decode(jwt);
      const user = await this.userRepository.findUserById(id);

      if (!user) {
        throw new Error();
      }
      return this.getTokens(id);
    } catch (error) {
      throw new HttpException('User is not authorized', 401);
    }
  }
}
