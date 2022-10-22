import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const IMotorcycleZodSchema = VehicleZodSchema.extend({
  // Deve retornar erro ao receber category diferente de Street, Custom ou Trail e category diferente de string;
  category: z.string({
    required_error: 'category must be informed',
    invalid_type_error: 'Invalid data',
  }).refine((value) => ['Street', 'Custom', 'Trail'].includes(value), {
    message: 'Invalid category',
  }),
  // A rota retorna erro 400 ao tentar criar uma moto com engineCapacity menor ou igual a zero;
  // A rota retorna erro 400 ao tentar criar uma moto com engineCapacity maior que 2500;
  engineCapacity: z.number({
    required_error: 'engineCapacity must be informed',
    invalid_type_error: 'Invalid data',
  }).int()
    .min(1, { message: 'Engine capacity must be 1 or more' }).max(2500),
});

export type IMotorcycle = z.infer<typeof IMotorcycleZodSchema>;

export { IMotorcycleZodSchema };