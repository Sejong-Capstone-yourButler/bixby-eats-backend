import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Stock } from '../entities/stock.entity';
import { RegisterStockInput } from './register-stock.dto';

@InputType()
export class EditStockInput extends PartialType(RegisterStockInput) {
  @Field((type) => Int)
  stockId?: number;
}

@ObjectType()
export class EditStockOutput extends CoreOutput {
  @Field((type) => Stock)
  stock?: Stock;
}
