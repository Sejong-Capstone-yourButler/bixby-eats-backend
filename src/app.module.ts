import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    RestaurantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hongjun',
      password: '12345', // Postgresql은 localhost에 연결된 경우, password를 안 물어본다.
      database: 'bixby-eats',
      synchronize: true, // TypeORM이 DB에 연결할 때 DB를 나의 모듈의 현재 상태로 migration한다는 뜻이다.
      logging: true, // DB에 무슨 일이 일어나는지 콘솔에 표시하는 거다.
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
