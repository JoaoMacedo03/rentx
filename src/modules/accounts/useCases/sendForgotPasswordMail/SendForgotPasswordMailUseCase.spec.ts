import { UserRepositoryMock } from '@modules/accounts/repositories/mocks/UsersRepositoryMock';
import { UsersTokensRepositoryMock } from '@modules/accounts/repositories/mocks/UsersTokensRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderMock } from '@shared/container/providers/DateProvider/mocks/MailProviderMock';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryMock: UserRepositoryMock;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderMock;

describe('Send forgot mail', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderMock();
    userRepositoryMock = new UserRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProvider,
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await userRepositoryMock.create({
      driver_license: '664168',
      email: 'tatzicle@lehuju.ch',
      name: 'Bryan Ingram',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('tatzicle@lehuju.ch');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an e-mail if the user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ugufovsu@ibcaoke.es'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryMock, 'create');

    await userRepositoryMock.create({
      driver_license: '77777',
      email: 'penecza@mucona.il',
      name: 'Polly Santos',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('penecza@mucona.il');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
