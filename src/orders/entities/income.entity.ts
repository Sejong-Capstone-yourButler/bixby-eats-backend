import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';

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

  @Field((type) => Restaurant, { nullable: true })
  @OneToOne((type) => Restaurant)
  restaurant: Restaurant;

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  @IsNumber()
  income?: number;
}
