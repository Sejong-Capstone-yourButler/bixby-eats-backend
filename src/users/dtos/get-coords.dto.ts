import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class GetCoordsOutput extends CoreOutput {
  @Field((type) => Float)
  lat?: number;

  @Field((type) => Float)
  lng?: number;
}
