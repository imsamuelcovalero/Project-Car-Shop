import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/cars.service';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore()
  });

  describe('Create Car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      const carCreated = await carService.readOne('6353147ba8913e3bbf02f2eb');

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'update').resolves(carMockWithId);

      const updated = await carService.update('any-id', carMock);

      expect(updated).to.be.deep.eq(carMockWithId);

      sinon.restore();
    })

    it('Failure - Zod', async () => {
      let error;

      try {
        await carService.update('any-id', { INVALID: "OBJECT" })
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError)
    })

    it('Failure - Car not Found', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let error: any;

      try {
        await carService.update('any-id', carMock)
      } catch (err) {
        error = err;
      }

      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
    })
  })

});