import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';

export interface RegisterDTO {
  email: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
}

export interface LoginUserDTO {
  emailOrPhone: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async register({ email, name, password }: RegisterDTO) {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', 409);
    }

    const userEntity = await new UserEntity({
      email,
      name,
      passwordHash: '',
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
      throw new HttpException('User is unauthorized', 401);
    }
  }
}
