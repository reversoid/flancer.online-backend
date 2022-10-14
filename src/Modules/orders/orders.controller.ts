import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './repositories/order.repository';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) { }

    @Get()
    getOrders(@Query() {fromDate, limit}: {fromDate: string, limit: string}) {        
        return this.ordersService.getOrders(fromDate, limit);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createOrder(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.createOrder(orderData);
    }
}
