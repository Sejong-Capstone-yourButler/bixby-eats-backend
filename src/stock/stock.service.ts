import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  RegisterStockInput,
  RegisterStockOutput,
} from './dtos/register-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stock: Repository<Stock>,
  ) {}

  async registerStock(
    owner: User,
    registerStockInput: RegisterStockInput,
  ): Promise<RegisterStockOutput> {
    try {
      const newStock = this.stock.create(registerStockInput);

      await this.stock.save(newStock);
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
}
