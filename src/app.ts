import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import carsRouter from './routes/cars';
import motorcyclesRouter from './routes/motorcycles';

const app = express();

app.use(express.json());
app.use(carsRouter);
app.use(motorcyclesRouter);
app.use(errorMiddleware);

export default app;
