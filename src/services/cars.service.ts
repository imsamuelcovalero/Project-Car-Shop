import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
// import CustomError from '../errors/CustomError';

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
    // É disparado o erro 400 Id must have 24 hexadecimal characters caso o id possua menos que 24 caracteres;
    if (_id.length !== 24) throw Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.readOne(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car as ICar;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return updated as ICar;
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async delete(_id: string): Promise<ICar> {
    const car = await this._car.delete(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car as ICar;
  }
}

export default CarsService;