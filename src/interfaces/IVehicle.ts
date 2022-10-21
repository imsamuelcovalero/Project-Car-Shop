import { z } from 'zod';

const INVALID = 'Invalid data';

const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model must be informed',
    invalid_type_error: INVALID,
  }).min(3),
  year: z.number({
    required_error: 'Year must be informed',
    invalid_type_error: INVALID,
  }).min(1900).max(2022),
  color: z.string({
    required_error: 'Color must be informed',
    invalid_type_error: INVALID,
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  // status: z.enum(['available', 'unavailable']),
  buyValue: z.number({
    required_error: 'Buy Value must be informed',
    invalid_type_error: INVALID,
  }).int(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };