import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty must be informed',
    invalid_type_error: 'Invalid data',
  }).int()
    .min(2, { message: 'Doors must be 2 or more' }).max(4),
  seatsQty: z.number({
    required_error: 'seatsQty must be informed',
    invalid_type_error: 'Invalid data',
  }).int()
    .min(2, { message: 'Seats quantity must be 2 or more' }).max(7),
});

export type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema };