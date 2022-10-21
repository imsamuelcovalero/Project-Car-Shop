import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import { ErrorTypes } from '../errors/catalog';
import CustomError from '../errors/CustomError';

const NOT_FOUNT = 'car not found';

class CarsService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new CustomError(404, NOT_FOUNT);

    return car as ICar;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) {
      throw new CustomError(404, NOT_FOUNT);
    }

    return updated as ICar;
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async delete(_id: string): Promise<ICar> {
    const car = await this._car.delete(_id);
    if (!car) throw new CustomError(404, NOT_FOUNT);

    return car as ICar;
  }
}

export default CarsService;