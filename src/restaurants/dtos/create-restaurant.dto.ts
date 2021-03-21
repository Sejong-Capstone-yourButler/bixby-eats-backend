import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

// @ArgsType()
// export class CreateRestaurantDto {
//   @Field((type) => String)
//   @IsString()
//   @Length(5, 10)
//   name: string;

//   @Field((type) => Boolean)
//   @IsBoolean()
//   isVegan: boolean;

//   @Field((type) => String)
//   @IsString()
//   address: string;

//   @Field((type) => String)
//   @IsString()
//   ownersName: string;
// }

// Mapped Type으로 dto를 entity와 연동할 수 있다.
// entity.ts 파일의 정의대로 dto가 정의된다.
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
