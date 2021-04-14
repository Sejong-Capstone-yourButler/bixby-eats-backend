import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockResolver, StockService],
})
export class StockModule {}
