import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderService } from './orders.service';

@Controller('restaurants/:restaurantId/')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get('orders')
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Query('status') status,
    @Param('restaurantId') restaurantId,
  ): Promise<GetOrdersOutput> {
    const getOrdersInput: GetOrdersInput = {
      status,
      restaurantId,
    };
    return this.ordersService.getOrders(user, getOrdersInput);
  }

  @Post()
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Body() body: CreateOrderInput,
    @Param('restaurantId') restaurantId,
  ): Promise<CreateOrderOutput> {
    const createOrderInput = {
      ...body,
      restaurantId: +restaurantId,
    };
    return this.ordersService.createOrder(customer, createOrderInput);
  }
}
