import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreateOrderItemInput {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => [OrderItemOption], { nullable: true })
  options?: OrderItemOption[];
}

@InputType()
export class CreateOrderInput {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [CreateOrderItemInput])
  items: CreateOrderItemInput[];

  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  orderId?: number;
}
