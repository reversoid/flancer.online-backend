import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, OrderDocument } from '../Schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from 'src/Dto/CreateOrder.dto';
import { Competence } from '../Schemas/competence.schema';

@Injectable()
// TODO guess something about naming of db services and server services
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { };

    /**
     * This function returns orders with pagination based on creation date.
     * @param fromDate Including this date orders will be given. 
     * @param limit Maximum number of orders will be given.
     * @default limit 100
     */
    async getOrders(
        fromDate: Date = new Date("2000-01-01T00:00:00Z"),
        limit: number = 100
    ) {
        try {
            let orders = await this.orderModel.find()
                .where('createdAt').gte(Number(fromDate))
                .sort({
                    createdAt: 'desc'
                })
                .limit(limit + 1)
                .exec()
            
            const [exists, startsFrom] = this._proceedNextPage(orders, limit)            

            // delete last element if we have more than limit number elements
            if (orders.length > limit) {
                orders = orders.slice(0, orders.length - 1)
            }

            return {
                orders,
                next: {
                    exists,
                    ...startsFrom && {
                        startsFrom
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }

    private _proceedNextPage(orders: Array<OrderDocument>, limit: number): [boolean, Date|null] {
        const nextPageExists = orders.length > limit;
        const nextPageStartsFrom = nextPageExists? orders[orders.length - 1].createdAt : null
               
        return [nextPageExists, nextPageStartsFrom]
    }

    async createOrder(orderData: CreateOrderDto) {
        try {
            const order = await this.orderModel.create({
                ...orderData
            });
            return (await order.save());
        } catch (error) {
            throw error;
        }
    }
}
