import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { TokenService } from './token.service';
import { UserService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UserService, TokenService],
    exports: [UserService, TokenService]
})
export class UsersModule {}
