import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/contracts/ICarsRepository';

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCars {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable({
      brand,
      category_id,
      name,
    });
    return cars;
  }
}

export { ListAvailableCars };
