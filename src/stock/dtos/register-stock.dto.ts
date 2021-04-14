import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Stock } from '../entities/stock.entity';

@InputType()
export class RegisterStockInput extends PickType(Stock, [
  'name',
  'price',
  'count',
  'description',
]) {}

@ObjectType()
export class RegisterStockOutput extends CoreOutput {
  @Field((type) => Int)
  stockId?: number;
}
