import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { SpecificationsRepositoryMock } from '@modules/cars/repositories/mocks/SpecificationsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMock: CarsRepositoryMock;
let specificationsRepositoryMock: SpecificationsRepositoryMock;
let carMock;

describe('Create car specification', () => {
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
    specificationsRepositoryMock = new SpecificationsRepositoryMock();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock,
      specificationsRepositoryMock,
    );
  });

  it('Should be able to add a new specification to an car', async () => {
    const car = await carsRepositoryMock.create(carMock);
    const specification = await specificationsRepositoryMock.create({
      name: 'Specific',
      description: 'test',
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('Should not be able to add a new specification to a non existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_ids = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
