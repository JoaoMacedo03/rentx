import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryMock: CarsRepositoryMock;
let carMock;

describe('Create Car', () => {
  beforeEach(() => {
    carMock = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    };
    carsRepositoryMock = new CarsRepositoryMock();
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(carMock);
    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with the same license plate', async () => {
    await createCarUseCase.execute(carMock);

    carMock.name = 'Car 2';

    await expect(createCarUseCase.execute(carMock)).rejects.toEqual(
      new AppError('Car already exists!'),
    );
  });

  it('Should create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(carMock);
    expect(car.available).toBe(true);
  });
});
