import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../Dto/CreateUser.dto';
import { LoginUserDto } from '../../Dto/LoginUser.dto';
import { User, UserDocument } from '../Schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async registration(userData: CreateUserDto): Promise<UserDocument> {
        try {
            // TODO make secure password storing

            const candidate = await this._findOne({email: userData.email});
            if (candidate) {
                throw new BadRequestException('Пользователь с данным email уже зарегистрирован');
            }

            const hashedPassword = await bcrypt.hash(userData.password, 11);
            const newUser = this._createUser({...userData, password: hashedPassword});
            return (await newUser).save();
        } catch (error) {
            throw error;
        }
    }
    async login(userData: LoginUserDto): Promise<UserDocument> {
        try {
            const candidate = await this._findOne({email: userData.email});
            if (!candidate) {
                throw new BadRequestException('Неверное имя пользователя или пароль');
            }
            
            const isPasswordCorrect = await bcrypt.compare(userData.password, candidate.password);
            if (!isPasswordCorrect) {
                throw new BadRequestException('Неверное имя пользователя или пароль');
            }

            return candidate;
        } catch (error) {
            throw error;
        }
    }
    async _findOne(filter: Object | Function): Promise<UserDocument> {
        try {
            return await this.userModel.findOne(filter);
        } catch (error) {
            throw error;
        }
    }
    async _createUser(userData: CreateUserDto): Promise<UserDocument> {
        try {
            return await this.userModel.create(userData);
        } catch (error) {
            throw error;
        }
    }
}
