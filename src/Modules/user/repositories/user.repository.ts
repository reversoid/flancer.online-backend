import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { UserEntity } from "../entities/user.entity";
import { User } from "../models/user.model";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    public async createUser(user: UserEntity) {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    // TODO MAYBE POSSIBLE TO UNITE THEM?
    public async findUserByEmail(email: string) {
        return this.userModel.findOne({
            email,
        }).exec();
    }

    public async findUserByPhone(phone: string) {
        return this.userModel.findOne({
            phone,
        }).exec();
    }

    public async findUserById(id: string) {
        return this.userModel.findById(id);
    }
}