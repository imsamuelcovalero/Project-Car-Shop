import { Router } from 'express';
import MotorcyclesController from '../controllers/motorcycles.controller';
import MotorcycleModel from '../models/Motorcycle';
import MotorcyclesService from '../services/motorcycles.service';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcyclesService(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

// route.post('/cars', validators.validateCar, carController.create);
route.post('/cars', (req, res) => motorcycleController.create(req, res));
route.get('/cars', (req, res) => motorcycleController.read(req, res));
route.get('/cars/:id', (req, res) => motorcycleController.readOne(req, res));
route.put('/cars/:id', (req, res) => motorcycleController.update(req, res));
route.delete('/cars/:id', (req, res) => motorcycleController.delete(req, res));

export default route;
