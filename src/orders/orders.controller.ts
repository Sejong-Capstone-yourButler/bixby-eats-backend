import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Body() getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    console.log(getOrdersInput);

    return this.ordersService.getOrders(user, getOrdersInput);
  }
}
