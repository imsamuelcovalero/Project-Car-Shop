import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const IMotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().max(2500),
});

export type IMotorcycle = z.infer<typeof IMotorcycleZodSchema>;

export { IMotorcycleZodSchema };