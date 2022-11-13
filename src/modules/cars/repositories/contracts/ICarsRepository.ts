import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable(data: IListCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
