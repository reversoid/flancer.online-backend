import { Injectable } from '@nestjs/common';
import { OrdersService as OrderServiceDB } from 'src/Database/orders/orders.service';
import { Competence } from 'src/Database/Schemas/competence.schema';
import { CreateOrderDto } from 'src/Dto/CreateOrder.dto';
import { CompetenceSchema } from 'src/Database/Schemas/competence.schema';

export interface RawOrder {
    // TODO add later as middleware
    // user: mongoose.Types.ObjectId;
    title: string;
    text: string;
    competencies: Array<string>;
}

@Injectable()
export class OrdersService {
    constructor (private readonly ordersServiceDB: OrderServiceDB) {};
    getOrders(fromDate?: string, limit?: string) {        
        return this.ordersServiceDB.getOrders(fromDate && new Date (fromDate), limit && Number(limit));
    }

    createOrder(orderData: RawOrder) {        
        return this.ordersServiceDB.createOrder({...orderData});
    }
}
