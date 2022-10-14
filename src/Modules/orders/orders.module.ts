import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './repositories/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models/order.model';

@Module({
  providers: [OrdersService, OrderRepository],
  controllers: [OrdersController],
  exports: [OrderRepository],
  imports: [MongooseModule.forFeature(
    [
      {
        name: Order.name,
        schema: OrderSchema,
      }
    ]
  )],
})
export class OrdersModule {}
