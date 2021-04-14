import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Dish } from '../entities/dish.entity';

@InputType()
class CreateDishIngredientInput {
  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  ingredientCount: number;
}

@InputType()
export class CreateDishInput extends PickType(Dish, [
  'name',
  'price',
  'description',
  'options',
]) {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [CreateDishIngredientInput])
  ingredients: CreateDishIngredientInput[];
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
