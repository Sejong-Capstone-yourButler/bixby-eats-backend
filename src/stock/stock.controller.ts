import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetStocksOutput, GetStocksInput } from './dtos/get-stocks.dto';
import { EditStockOutput, EditStockInput } from './dtos/edit-stock.dto';
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

  @Post(':stockId')
  @Role(['Owner'])
  async editStock(
    @AuthUser() owner: User,
    @Body() body: EditStockInput,
    @Param('stockId') stockId,
  ): Promise<EditStockOutput> {
    const editStockInput = {
      ...body,
      stockId: +stockId,
    };
    return this.stockService.editStock(owner, editStockInput);
  }
}
