import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Dish } from '../entities/dish.entity';

@InputType()
export class EditDishInput extends PickType(PartialType(Dish), [
  'name',
  'options',
  'price',
  'description',
  'options',
  'ingredients',
]) {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class EditDishOutput extends CoreOutput {
  @Field((type) => Dish)
  dish?: Dish;
}
