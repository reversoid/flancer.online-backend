import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './repositories/order.repository';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getOrders(@Query() {fromDate, limit}: {fromDate: string, limit: string}) {        
        return this.ordersService.getOrders(fromDate, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createOrder(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.createOrder(orderData);
    }
}
