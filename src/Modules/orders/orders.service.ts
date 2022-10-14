import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrdersService {
    constructor (private readonly orderRepository: OrderRepository) {}
    
    public async getOrders(fromDate?: string, limit?: string) {
        const from = fromDate && new Date(fromDate);
        const max = limit && Number(limit);

        return this.orderRepository.getOrders(from, max);
    }

    public async createOrder(orderData: CreateOrderDTO) {    
        const order = await this.orderRepository.createOrder(orderData); 
        return order._id;   
    }
}
