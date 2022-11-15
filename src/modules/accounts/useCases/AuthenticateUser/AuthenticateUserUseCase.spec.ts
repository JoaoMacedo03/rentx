import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokensRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokensRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryMock: UserRepositoryMock;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;

const user: ICreateUserDTO = {
  driver_license: '021902',
  name: 'Cloud Strife',
  password: 'FF7',
  email: 'cloud@midgard.com',
};

describe('Authenticate User', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    userRepositoryMock = new UserRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
    );
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

  it('Should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'test',
      }),
    ).rejects.toEqual(new AppError('E-mail or password incorrect'));
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'shouldNotWork',
      }),
    ).rejects.toEqual(new AppError('E-mail or password incorrect'));
  });
});
