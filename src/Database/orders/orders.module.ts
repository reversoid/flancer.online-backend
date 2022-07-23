import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Competence, CompetenceSchema } from '../Schemas/competence.schema';
import { Order, OrderSchema } from '../Schemas/order.schema';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Competence.name, schema: CompetenceSchema },
    ]),
  ],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
