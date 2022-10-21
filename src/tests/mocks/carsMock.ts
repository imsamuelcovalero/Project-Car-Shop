import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
	"model": "Ferrari Maranello",
	"year": 1963,
	"color": "red",
	"buyValue": 3500000,
	"doorsQty": 2,
	"seatsQty": 2,
};

const carMockWithId: ICar & { _id: string } = {
	_id: '6353147ba8913e3bbf02f2eb',
	"model": "Ferrari Maranello",
	"year": 1963,
	"color": "red",
	"buyValue": 3500000,
	"doorsQty": 2,
	"seatsQty": 2,
};

const carMockForChange: ICar = {
	"model": "Ferrari Maranello 2",
	"year": 1993,
	"color": "blue",
	"buyValue": 4500000,
	"doorsQty": 4,
	"seatsQty": 5,
};

const carMockForChangeWithId: ICar & { _id: string } = {
	_id: '6353147ba8913e3bbf02f2eb',
	"model": "Ferrari Maranello 2",
	"year": 1993,
	"color": "blue",
	"buyValue": 4500000,
	"doorsQty": 4,
	"seatsQty": 5,
};

export {
	carMock,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
};
