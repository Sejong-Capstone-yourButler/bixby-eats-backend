import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Category } from './restaurants/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',

      // Joi와 validationSchema를 통해서 env variables 유효성 검사를 한다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,

      // Postgresql은 localhost에 연결된 경우, password를 안 물어본다.
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // TypeORM이 DB에 연결할 때 DB를 나의 모듈의 현재 상태로 migration한다는 뜻이다.
      synchronize: process.env.NODE_ENV !== 'prod',

      // DB에 무슨 일이 일어나는지 콘솔에 표시하는 거다.
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [User, Verification, Restaurant, Category],
    }),
    // GraphQLModule처럼 설정이 있으면 Dynamic Module이다.
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // Grapql context에 { user : req['user'] }
      context: ({ req }) => {
        console.log('GraphQl context');
        return { user: req['user'] };
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),

    // 밑에 module처럼 설정이 없으면 static module이다.
    UsersModule,
  ],
  controllers: [],
  providers: [],
})

// Class를 이용해서 Middleware를 설정하는 방법
// function middleware를 사용하고 싶다면 main.ts에서 app.use()를 사용한다.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('Before consumer');
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
    console.log('After consumer');
  }
}
