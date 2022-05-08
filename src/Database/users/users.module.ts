import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { UserService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
