import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

@InputType('IncomeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Income extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  createdAtString: string;

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  @IsNumber()
  income?: number;

  @Field((type) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.incomes, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
