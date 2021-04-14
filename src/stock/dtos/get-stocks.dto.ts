import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Stock } from '../entities/stock.entity';

@InputType()
export class GetStocksInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class GetStocksOutput extends CoreOutput {
  @Field((type) => [Stock])
  stocks?: Stock[];
}
