import dayjs from 'dayjs';

import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { RentalsRepositoryMock } from '@modules/rentals/repositories/mock/RentalsRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryMock: RentalsRepositoryMock;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryMock: CarsRepositoryMock;

describe('Create Rental', () => {
  const dayAdd24hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayJsProvider = new DayjsDateProvider();
    rentalsRepositoryMock = new RentalsRepositoryMock();
    carsRepositoryMock = new CarsRepositoryMock();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMock,
      dayJsProvider,
      carsRepositoryMock,
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '9889078097',
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another one open to the same user ', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '9889078097',
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: `${car.id}shouldNotPass`,
        user_id: '9889078097',
        expected_return_date: dayAdd24hours,
      }),
    ).rejects.toEqual(new AppError('This user already has an active rental'));
  });

  it('Should not be able to create a new rental if there is another one open to the same car ', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '9889078097',
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '9889078097',
        expected_return_date: dayAdd24hours,
      }),
    ).rejects.toEqual(new AppError('Car is not available'));
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '112232',
        user_id: '9889078097',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
