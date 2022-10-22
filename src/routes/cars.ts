import { Router } from 'express';
import CarsController from '../controllers/cars.controller';
import CarsModel from '../models/Car';
import CarsService from '../services/cars.service';

const route = Router();

const car = new CarsModel();
const carService = new CarsService(car);
const carController = new CarsController(carService);

// route.post('/cars', validators.validateCar, carController.create);
route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.put('/cars/:id', (req, res) => carController.update(req, res));
route.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default route;
