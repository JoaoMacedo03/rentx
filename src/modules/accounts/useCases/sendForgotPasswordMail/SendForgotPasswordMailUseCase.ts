import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/contracts/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/contracts/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/contracts/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/contracts/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('User does not exists');

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);

    const variables = {
      name: user.name,
      link: `${process.env.FORGO_MAIL_URL}=${token}`,
    };

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
