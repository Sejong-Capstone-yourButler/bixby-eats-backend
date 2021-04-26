import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Dish } from '../entities/dish.entity';

@InputType()
export class GetDishsInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class GetDishsOutput extends CoreOutput {
  @Field((type) => [Dish])
  dishes?: Dish[];
}
