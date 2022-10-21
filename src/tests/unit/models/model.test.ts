import { expect } from 'chai';
import sinon from 'sinon';
import CarsModel from '../../../models/Car';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
} from '../../mocks/carsMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carsModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carsModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carsModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('changing a car', () => {
    it('successfully changed', async () => {
      const carChanged = await carsModel.update('62cf1fc6498565d94eba52cd', carMockForChange);
      expect(carChanged).to.be.deep.equal(carMockForChangeWithId);
    });

    it('_id not found to change', async () => {
      try {
        await carsModel.update('123ERRADO', carMockForChange);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

});
