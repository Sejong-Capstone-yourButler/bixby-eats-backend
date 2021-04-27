import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from 'src/orders/entities/income.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Dish } from './entities/dish.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantsController } from './restaurants.controller';
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      Dish,
      Stock,
      Ingredient,
      Income,
      CategoryRepository,
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
    RestaurantService,
  ],
})
export class RestaurantsModule {}
