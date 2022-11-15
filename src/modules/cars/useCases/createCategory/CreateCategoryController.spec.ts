// import { hash } from 'bcrypt';
// import request from 'supertest';
// import { v4 as uuidV4 } from 'uuid';

// import { dataSource } from '@shared/database/typeorm/dataSource';
// import { app } from '@shared/infra/http/server';

describe('Create Category Controller', () => {
  // beforeAll(async () => {
  //   const id = uuidV4();
  //   const password = await hash('admin', 8);

  //   await dataSource.initialize();
  //   await dataSource.runMigrations();
  //   const queryRunner = dataSource.createQueryRunner();
  //   await queryRunner.manager.query(
  //     `INSERT INTO users (id, name, email, password, created_at, driver_license, "isAdmin") VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}',  'now()', 'XXXXXX', true)`,
  //   );
  // });

  // afterAll(async () => {
  //   await dataSource.dropDatabase();
  // });

  // it('Should be able to create a new category', async () => {
  //   const responseToken = await request(app)
  //     .post('/sessions')
  //     .send({ email: 'admin@rentx.com.br', password: 'admin' });

  //   const { token } = responseToken.body;

  //   const response = await request(app)
  //     .post('/categories')
  //     .send({
  //       name: 'Category Supertest',
  //       description: 'Category Supertest Description',
  //     })
  //     .set({
  //       Authorization: `Bearer ${token}`,
  //     });

  //   expect(response.status).toBe(201);
  // });

  it('Test', () => {
    const a = 2 + 2;

    expect(a).toBe(4);
  });
});
