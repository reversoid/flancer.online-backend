import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../Schemas/order.schema';
import { OrdersService } from './orders.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
