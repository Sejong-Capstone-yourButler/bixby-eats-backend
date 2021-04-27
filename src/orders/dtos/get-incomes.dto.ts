import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Income } from '../entities/income.entity';

@InputType()
export class GetIncomesInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class GetIncomesOutput extends CoreOutput {
  @Field((type) => [Income], { nullable: true })
  incomes?: Income[];
}
