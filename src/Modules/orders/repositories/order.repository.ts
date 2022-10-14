import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NumericFromTo, Order } from '../models/order.model';
import { Model } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  userID: string;
  
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  competencies: string[];

  @IsNotEmpty()
  price: NumericFromTo;

  @IsNotEmpty()
  timeperiod: NumericFromTo | null;
}

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  public async getOrders(
    fromDate: Date = new Date('2000-01-01T00:00:00Z'),
    limit = 20,
  ) {
    let orders = await this.orderModel
      .find()
      .where('createdAt')
      .gte(Number(fromDate))
      .sort({
        createdAt: 'desc',
      })
      .limit(limit + 1)
      .exec();

    const [exists, startsFrom] = this._proceedNextPage(orders, limit);

    if (orders.length > limit) {
      orders = orders.slice(0, limit);
    }

    return {
      orders,
      next: {
        exists,
        startsFrom,
      },
    };
  }

  public async createOrder(orderData: CreateOrderDTO) {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  private _proceedNextPage(
    orders: Array<Order>,
    limit: number,
  ): [boolean, Date | null] {
    const nextPageExists = orders.length > limit;

    let nextPageStartsFrom: Date | null = null;
    if (nextPageExists) {
      nextPageStartsFrom = orders.at(-1).createdAt;
    }

    return [nextPageExists, nextPageStartsFrom];
  }
}
