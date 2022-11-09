import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryMock: UserRepositoryMock;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

const user: ICreateUserDTO = {
  driver_license: '021902',
  name: 'Cloud Strife',
  password: 'FF7',
  email: 'cloud@midgard.com',
};

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryMock);
    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('Should be able to authenticate a user', async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'shouldNotWork',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
