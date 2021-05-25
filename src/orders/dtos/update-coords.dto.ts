import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateCoordsInput {
  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}

@ObjectType()
export class UpdateCoordsOutput extends CoreOutput {
  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}
