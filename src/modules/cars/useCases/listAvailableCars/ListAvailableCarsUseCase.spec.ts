import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';

import { ListAvailableCars } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCars;
let carsRepositoryMock: CarsRepositoryMock;
let carMock;

describe('List cars', () => {
  beforeEach(() => {
    carMock = {
      name: 'Bumblebee 1',
      description: 'Transformers',
      daily_rate: 1000,
      license_plate: 'ADD-1234',
      fine_amount: 60,
      brand: 'Inter-space',
      category_id: 'category_id',
    };
    carsRepositoryMock = new CarsRepositoryMock();
    listCarsUseCase = new ListAvailableCars(carsRepositoryMock);
  });

  it('Should be able to list all availables cars', async () => {
    const car = await carsRepositoryMock.create(carMock);
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    carMock.name = 'Bumblee 2';
    const car = await carsRepositoryMock.create(carMock);
    const cars = await listCarsUseCase.execute({ name: 'Bumblee 2' });
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    carMock.brand = 'Mustang';
    const car = await carsRepositoryMock.create(carMock);
    const cars = await listCarsUseCase.execute({ brand: 'Mustang' });
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category id', async () => {
    carMock.category_id = '4 wheels';
    const car = await carsRepositoryMock.create(carMock);
    const cars = await listCarsUseCase.execute({ category_id: '4 wheels' });
    expect(cars).toEqual([car]);
  });
});
