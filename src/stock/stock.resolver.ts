import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { EditStockInput, EditStockOutput } from './dtos/edit-stock.dto';
import { GetStocksInput, GetStocksOutput } from './dtos/get-stocks.dto';
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
    @AuthUser() owner: User,
    @Args('input') registerStockInput: RegisterStockInput,
  ): Promise<RegisterStockOutput> {
    return this.stockService.registerStock(owner, registerStockInput);
  }

  @Mutation((returns) => EditStockOutput)
  @Role(['Owner'])
  async editStock(
    @AuthUser() owner: User,
    @Args('input') registerStockInput: EditStockInput,
  ): Promise<EditStockOutput> {
    return this.stockService.editStock(owner, registerStockInput);
  }

  @Query((returns) => GetStocksOutput)
  @Role(['Owner'])
  async getStocks(
    @AuthUser() owner: User,
    @Args('input') getStocksInput: GetStocksInput,
  ): Promise<GetStocksOutput> {
    console.log(typeof getStocksInput);
    return this.stockService.getStocks(owner, getStocksInput);
  }
}
