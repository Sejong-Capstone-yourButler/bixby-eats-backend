import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('IngredientInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Ingredient extends CoreEntity {
  @Field((type) => Stock, { nullable: true })
  @ManyToOne((type) => Stock, (stock) => stock.ingredients, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  stock: Stock;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  count?: number;
}
