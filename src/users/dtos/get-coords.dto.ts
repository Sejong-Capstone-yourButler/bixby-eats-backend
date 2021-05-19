import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetCoordsInput {
  @Field((type) => Int)
  Id: number;
}

@ObjectType()
export class GetCoordsOutput extends CoreOutput {
  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}
