import { Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
// import CustomError from '../errors/CustomError';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    // console.log('req', req.body);
    function isEmpty(obj: typeof req) {
      return Object.keys(obj).length === 0;
    }
    if (isEmpty(req.body)) {
      throw Error(ErrorTypes.EmptyRequestBody);
    }
    // if (!req.body) {
    //   console.log('Request body is empty');

    //   throw Error(ErrorTypes.EmptyRequestBody);
    // }
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const updated = await this._service.update(req.params.id, req.body);
    return res.status(200).json(updated);
  }

  public async read(
    _req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}