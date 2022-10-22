import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import carsRouter from './routes/cars';

const app = express();

app.use(express.json());
app.use(carsRouter);
app.use(errorMiddleware);

export default app;
