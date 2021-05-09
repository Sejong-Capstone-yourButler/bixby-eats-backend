import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { EditStockInput, EditStockOutput } from './dtos/edit-stock.dto';
import { GetStocksInput, GetStocksOutput } from './dtos/get-stocks.dto';
import {
  RegisterStockInput,
  RegisterStockOutput,
} from './dtos/register-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stocks: Repository<Stock>,

    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async registerStock(
    owner: User,
    registerStockInput: RegisterStockInput,
  ): Promise<RegisterStockOutput> {
    try {
      const newStock = this.stocks.create(registerStockInput);

      await this.stocks.save(newStock);
      return {
        ok: true,
        stockId: newStock.id,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not register stock',
      };
    }
  }

  async editStock(
    owner: User,
    editStockInput: EditStockInput,
  ): Promise<EditStockOutput> {
    try {
      const stock = await this.stocks.findOne(editStockInput.stockId, {
        relations: ['restaurant'],
      });
      if (!stock) {
        return {
          ok: false,
          error: 'Stock not found',
        };
      }
      if (stock?.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.stocks.save([
        {
          id: editStockInput.stockId,
          ...editStockInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit stock',
      };
    }
  }

  async getStocks(
    owner: User,
    { id }: GetStocksInput,
  ): Promise<GetStocksOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        owner,
        id,
      });
      const stocks = await this.stocks.find({
        where: {
          restaurant,
        },
        order: {
          createdAt: 'ASC',
        },
      });
      return {
        stocks,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find stocks.',
      };
    }
  }
}
