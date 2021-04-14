import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Stock } from './entities/stock.entity';
import { StockController } from './stock.controller';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Stock])],
  controllers: [StockController],
  providers: [StockResolver, StockService],
})
export class StockModule {}
