import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetRestaurantPositionInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class GetRestaurantPositionOutput extends CoreOutput {
  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}
