import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const IMotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  // category: z.string({
  //   required_error: 'category must be informed',
  //   invalid_type_error: 'Invalid data',
  // }).refine((value) => ['Street', 'Custom', 'Trail'].includes(value), {
  //   message: 'Invalid category',
  // }),
  engineCapacity: z.number({
    required_error: 'engineCapacity must be informed',
    invalid_type_error: 'Invalid data',
  }).int()
    .min(1, { message: 'Engine capacity must be 1 or more' }).max(2500),
});

export type IMotorcycle = z.infer<typeof IMotorcycleZodSchema>;

export { IMotorcycleZodSchema };