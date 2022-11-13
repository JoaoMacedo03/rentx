import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { dataSource } from '../dataSource';

async function create() {
  const id = uuidV4();
  const password = await hash('admin', 8);

  const database = await dataSource.initialize();
  const queryRunner = database.createQueryRunner();
  await queryRunner.manager.query(
    `INSERT INTO users (id, name, email, password, created_at, driver_license, "isAdmin") VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}',  'now()', 'XXXXXX', true)`,
  );
}

create().then(() => console.log('User admin created'));
