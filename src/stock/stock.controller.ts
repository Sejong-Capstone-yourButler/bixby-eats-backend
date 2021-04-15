import { Controller, Get, Param } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetStocksInput, GetStocksOutput } from './dtos/get-stocks.dto';
import { StockService } from './stock.service';

@Controller('restaurants/:restaurantId/stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @Role(['Owner'])
  async getStocks(
    @AuthUser() owner: User,
    @Param('restaurantId') id,
  ): Promise<GetStocksOutput> {
    const getStocksInput: GetStocksInput = {
      id,
    };
    return this.stockService.getStocks(owner, getStocksInput);
  }
}
