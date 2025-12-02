import { z } from 'zod';

export const instructorLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
});

export const instructorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string(),
  avatar: z.string().url().optional(),
  pricePerHour: z.number().positive(),
  categories: z.array(z.enum(['car', 'motorcycle'])).min(1),
  yearsOfExperience: z.number().int().min(0),
  bio: z.string().max(500),
  location: instructorLocationSchema,
  rating: z.number().min(0).max(5),
  totalClasses: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});

export const instructorsListSchema = z.array(instructorSchema);

export type Instructor = z.infer<typeof instructorSchema>;
export type InstructorLocation = z.infer<typeof instructorLocationSchema>;
