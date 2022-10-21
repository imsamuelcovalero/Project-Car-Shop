import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  // Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional
  status: z.boolean().optional(),
  // status: z.enum(['available', 'unavailable']),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };