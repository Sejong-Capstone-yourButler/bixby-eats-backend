import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  RegisterStockInput,
  RegisterStockOutput,
} from './dtos/register-stock.dto';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';

@Resolver((of) => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Mutation((returns) => RegisterStockOutput)
  @Role(['Owner'])
  async registerStock(
    @AuthUser() authUser: User,
    @Args('input') registerStockInput: RegisterStockInput,
  ): Promise<RegisterStockOutput> {
    return this.stockService.registerStock(authUser, registerStockInput);
  }
}
