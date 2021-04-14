import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { RegisterStockInput } from './register-stock.dto';

@InputType()
export class EditStockInput extends PartialType(RegisterStockInput) {
  @Field((type) => Int)
  stockId?: number;
}

@ObjectType()
export class EditStockOutput extends CoreOutput {}
