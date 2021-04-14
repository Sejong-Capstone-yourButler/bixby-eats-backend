import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';

@InputType('StockInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Stock extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  count: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 140)
  description: string;
}
