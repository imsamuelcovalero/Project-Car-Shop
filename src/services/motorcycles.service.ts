import { IService } from '../interfaces/IService';
import { IMotorcycle, IMotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
// import CustomError from '../errors/CustomError';

class CarsService implements IService<IMotorcycle> {
  private _car: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    if (_id.length !== 24) throw Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.readOne(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car as IMotorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return updated as IMotorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._car.read();
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const car = await this._car.delete(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car as IMotorcycle;
  }
}

export default CarsService;