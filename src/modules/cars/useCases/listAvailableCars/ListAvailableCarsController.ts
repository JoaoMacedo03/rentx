import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCars } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;

    const listAvailableCarsUseCase = container.resolve(ListAvailableCars);

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
