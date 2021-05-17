import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Ingredient } from 'src/restaurants/entities/ingredient.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@InputType('StockInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Stock extends CoreEntity {
  @Field((type) => Int)
  stockId?: number;

  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => Int, { defaultValue: 0 })
  @Column({ default: 0 })
  @IsNumber()
  count: number;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  price?: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @Length(1, 140)
  description?: string;

  @Field((type) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.stock, {
    onDelete: 'CASCADE',
  })
  restaurant?: Restaurant;

  @RelationId((stock: Stock) => stock.restaurant)
  restaurantId: number;

  @Field((type) => [Ingredient], { nullable: true })
  @OneToMany((type) => Ingredient, (ingredient) => ingredient.stock)
  ingredients?: Ingredient[];
}
