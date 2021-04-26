import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetDishsInput, GetDishsOutput } from './dtos/get-dishs.dto';
import { RestaurantService } from './restaurants.service';

@Controller('restaurants/:restaurantId/dishes')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantService) {}

  @Get()
  @Role(['Owner'])
  async getDishs(
    @AuthUser() owner: User,
    @Param('restaurantId') restaurantId,
  ): Promise<GetDishsOutput> {
    const GetDishsInput: GetDishsInput = {
      restaurantId,
    };
    return this.restaurantsService.getDishes(owner, GetDishsInput);
  }
}
