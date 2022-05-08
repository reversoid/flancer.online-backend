import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersModule as OrdersModuleDB } from 'src/Database/orders/orders.module';

@Module({
  imports: [OrdersModuleDB],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
