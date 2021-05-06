import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderService } from './orders.service';

@Controller('restaurants/:restaurantId/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
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
}
