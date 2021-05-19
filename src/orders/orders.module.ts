import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { User } from 'src/users/entities/user.entity';
import { Income } from './entities/income.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Restaurant,
      OrderItem,
      Dish,
      Stock,
      Income,
      User,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
