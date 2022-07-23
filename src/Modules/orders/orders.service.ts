import { Injectable } from '@nestjs/common';
import { OrdersService as OrderServiceDB } from 'src/Database/orders/orders.service';
import { CreateOrderDto } from 'src/Dto/CreateOrder.dto';

export interface RawOrder {
    // TODO add later as middleware
    // user: mongoose.Types.ObjectId;
    title: string;
    text: string;
    competencies: Array<string>;
}

@Injectable()
export class OrdersService {
    constructor (private readonly ordersServiceDB: OrderServiceDB) {}
    getOrders(fromDate?: string, limit?: string) {        
        return this.ordersServiceDB.getOrders(fromDate && new Date (fromDate), limit && Number(limit));
    }

    createOrder(orderData: CreateOrderDto) {        
        return this.ordersServiceDB.createOrder({...orderData});
    }
}
