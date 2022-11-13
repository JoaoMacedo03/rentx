import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/contracts/IUsersRepository';
import { dataSource } from '@shared/database/typeorm/dataSource';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({
    name,
    driver_license,
    password,
    email,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      password,
      email,
      isAdmin: false,
      avatar,
      id,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
