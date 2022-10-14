import { Module } from '@nestjs/common';
import { AuthModule } from './Modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './Modules/orders/orders.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: 'src/envs/local.env'}),
    MongooseModule.forRootAsync(getMongoConfig()),
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
