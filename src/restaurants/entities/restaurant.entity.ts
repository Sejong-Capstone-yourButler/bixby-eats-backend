import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // GraphQL을 위한 code
@Entity() // typeORM을 위한 code
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String) // GraphQL은 Field
  @Column() // TypeORM은 Column을 사용한다.
  name: string;

  @Field((type) => Boolean)
  @Column()
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  address: string;

  @Field((type) => String)
  @Column()
  ownersName: string;

  @Field((type) => String)
  @Column()
  categoryName: string;
}
