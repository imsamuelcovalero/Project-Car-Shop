import { Router } from 'express';
import MotorcyclesController from '../controllers/motorcycles.controller';
import MotorcycleModel from '../models/Motorcycle';
import MotorcyclesService from '../services/motorcycles.service';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcyclesService(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

const PATCH_ID = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get(PATCH_ID, (req, res) => motorcycleController.readOne(req, res));
route.put(PATCH_ID, (req, res) => motorcycleController.update(req, res));
route.delete(PATCH_ID, (req, res) => motorcycleController.delete(req, res));

export default route;
