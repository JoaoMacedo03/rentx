import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/contracts/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalByUser;
  }
}

export { ListRentalsByUserUseCase };
