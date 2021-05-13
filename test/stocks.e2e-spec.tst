// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
// import { getConnection, Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Stock } from 'src/stock/entities/stock.entity';


// const GRAPHQL_ENDPOINT = '/graphql';

// const testUser = {
//   email: 'owner@gmail.com',
//   password: '12345',
// };

// describe('StockModule (e2e)', () => {
//   let app: INestApplication;
//   let stocksRepository: Repository<Stock>;
//   let jwtToken: string;

//   const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
//   const publicTest = (query: string) => baseTest().send({ query });
//   const privateTest = (query: string) =>
//     baseTest().set('X-JWT', jwtToken).send({ query });

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//     app = module.createNestApplication();
//     stocksRepository = module.get<Repository<Stock>>(getRepositoryToken(Stock));
//     await app.init();
//   });

//   afterAll(async () => {
//     await getConnection().dropDatabase();
//     app.close();
//   });

//   describe('createAccount', () => {
//     it('should create account', () => {
//       return publicTest(`
//         mutation {
//           createAccount(input: {
//             email:"${testUser.email}",
//             password:"${testUser.password}",
//             role:Owner
//           }) {
//             ok
//             error
//           }
//         }
//         `)
//         .expect(200)
//         .expect((res) => {
//           expect(res.body.data.createAccount.ok).toBe(true);
//           expect(res.body.data.createAccount.error).toBe(null);
//         });
//     });

//     it('should fail if account already exists', () => {
//       return publicTest(`
//           mutation {
//             createAccount(input: {
//               email:"${testUser.email}",
//               password:"${testUser.password}",
//               role:Owner
//             }) {
//               ok
//               error
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: {
//                 createAccount: { ok, error },
//               },
//             },
//           } = res;
//           expect(ok).toBe(false);
//           expect(error).toBe('There is a user with that email already');
//         });
//     });
//   });

//   describe('login', () => {
//     it('should login with correct credentials', () => {
//       return publicTest(`
//           mutation {
//             login(input:{
//               email:"${testUser.email}",
//               password:"${testUser.password}",
//             }) {
//               ok
//               error
//               token
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: { login },
//             },
//           } = res;
//           expect(login.ok).toBe(true);
//           expect(login.error).toBe(null);
//           expect(login.token).toEqual(expect.any(String));
//           jwtToken = login.token;
//         });
//     });
//     it('should not be able to login with wrong credentials', () => {
//       return publicTest(`
//           mutation {
//             login(input:{
//               email:"${testUser.email}",
//               password:"xxx",
//             }) {
//               ok
//               error
//               token
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: { login },
//             },
//           } = res;
//           expect(login.ok).toBe(false);
//           expect(login.error).toBe('Wrong password');
//           expect(login.token).toBe(null);
//         });
//     });
//   });

//   describe('registerStock', () => {
//     let stockId = null;
//     it('should register stock', () => {
//       return privateTest(`
//           mutation{
//             registerStock(input:{
//               name:"돈까스"
//               count:200
//               price:500
//             }){
//               ok
//               error
//               stockId
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: { registerStock },
//             },
//           } = res;
//           expect(registerStock.ok).toBe(true);
//           expect(registerStock.error).toBe(null);
//           expect(registerStock.stockId).toEqual(expect.any(Number));
//           stockId = registerStock.stockId;
//         });
//     });
//   });

//   describe('createDish', () => {
//     let stockId: number;
//     beforeAll(async () => {
//       const [stock] = await stocksRepository.find({
//         relations: ['restaurant'],
//       });
//       stockId = stock.id;
//     });
//     it('should create dish', () => {
//       return privateTest(`
//           mutation {
//             createDish(
//               input: {
//                 name: "등심까스"
//                 price: 7000
//                 description: "맛있어요."
//                 ingredients:[
//                   {
//                     name:"돈까스"
//                     ingredientCount:1
//                   },
//                   {
//                     name:"감자"
//                     ingredientCount:2
//                   }
//                 ]
//                 restaurantId: 
//               }
//             ) {
//               error
//               ok
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: { editStock },
//             },
//           } = res;
//           expect(editStock.ok).toBe(true);
//           expect(editStock.error).toBe(null);
//           expect(editStock.stock.id).toEqual(expect.any(Number));
//         });
//     });
//   });

//   describe('editStock', () => {
//     let stockId: number;
//     beforeAll(async () => {
//       const [stock] = await stocksRepository.find({
//         relations: ['restaurant'],
//       });
//       stockId = stock.id;
//     });
//     it('should register stock', () => {
//       return privateTest(`
//           mutation{
//             editStock(input:{
//               count:2002
//               price:5002
//               description:"맜있어요"
//               stockId:${stockId}
//             }){
//               ok
//               error
//             }
//           }
//         `)
//         .expect(200)
//         .expect((res) => {
//           const {
//             body: {
//               data: { editStock },
//             },
//           } = res;
//           expect(editStock.ok).toBe(true);
//           expect(editStock.error).toBe(null);
//           expect(editStock.stock.id).toEqual(expect.any(Number));
//         });
//     });
//   });
// });
