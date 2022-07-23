import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from 'src/Dto/CreateOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) { }

    @Get()
    getOrders(@Query() {fromDate, limit}: {fromDate: string, limit: string}) {        
        return this.ordersService.getOrders(fromDate, limit);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createOrder(@Body() orderData: CreateOrderDto) {
        return this.ordersService.createOrder(orderData);
    }

}
