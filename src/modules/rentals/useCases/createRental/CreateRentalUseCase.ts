import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/contracts/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/contracts/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/contracts/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentHour = 24;

    const notAvailableCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (notAvailableCar) throw new AppError('Car is not available');

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );
    if (rentalOpenToUser)
      throw new AppError('This user already has an active rental');

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (compare < minimumRentHour) throw new AppError('Invalid return time!');

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
