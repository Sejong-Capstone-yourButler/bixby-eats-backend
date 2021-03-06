import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Income } from 'src/orders/entities/income.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@InputType('RestaurantInputType', { isAbstract: true }) // Dto를 위한 code
@ObjectType() // GraphQL을 위한 code
@Entity() // typeORM을 위한 code
export class Restaurant extends CoreEntity {
  @Field((type) => String) // GraphQL은 Field
  @Column() // TypeORM은 Column을 사용한다. (DB)
  @IsString()
  @Length(1)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => Float)
  @Column({ type: 'float' })
  @IsNumber()
  lat: number;

  @Field((type) => Float)
  @Column({ type: 'float' })
  @IsNumber()
  lng: number;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.restaurant)
  orders: Order[];

  @Field((type) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field((type) => [Stock])
  @OneToMany((type) => Stock, (stock) => stock.restaurant)
  stock: Stock[];

  @Field((type) => [Income])
  @OneToMany((type) => Income, (income) => income.restaurant)
  incomes: Income[];

  @Field((type) => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}
