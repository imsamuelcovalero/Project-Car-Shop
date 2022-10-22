import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import CustomError from '../errors/CustomError';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {
    // console.log('req', req.body);

    if (!req.body) {
      throw new CustomError(400, 'Request body is empty');
    }
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<ICar>,
  ) {
    const updated = await this._service.update(req.params.id, req.body);
    return res.status(200).json(updated);
  }

  public async read(
    _req: Request,
    res: Response<ICar[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response<ICar>,
  ) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}