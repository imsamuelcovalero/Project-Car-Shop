import { Router } from 'express';
import CarsController from '../controllers/cars.controller';
import CarsModel from '../models/Car';
import CarsService from '../services/cars.service';
// import validators from '../middlewares/validators';

const route = Router();

const car = new CarsModel();
const carService = new CarsService(car);
const carController = new CarsController(carService);

// route.post('/cars', validators.validateCar, carController.create);
route.post('/cars', (req, res) => carController.create(req, res));
// Crie uma rota que receba uma requisição GET para receber todos os veículos do tipo carro registrados no banco de dados.
route.get('/cars', (req, res) => carController.read(req, res));

export default route;
