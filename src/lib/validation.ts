import { z } from 'zod';
import { services } from './services';
import { paymentStatuses, requestStatuses, technicianApplicationStatuses } from './status';

export const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];

export const serviceSlugSchema = z.enum(serviceSlugs);
export const requestStatusSchema = z.enum(requestStatuses);
export const paymentStatusSchema = z.enum(paymentStatuses);
export const technicianApplicationStatusSchema = z.enum(technicianApplicationStatuses);

export const propertyTypeSchema = z.enum(['condo', 'villa', 'house', 'townhouse']);
export const timeWindowSchema = z.enum(['morning', 'afternoon', 'evening']);

export const emailSchema = z
  .string()
  .trim()
  .email('Enter a valid email address.')
  .max(254);

export const phoneSchema = z
  .string()
  .trim()
  .min(8, 'Use at least 8 digits.')
  .max(40, 'Phone number is too long.')
  .refine((value) => /^[+()\d\s.-]+$/.test(value), 'Use only digits, spaces, dashes, brackets, and +.')
  .refine((value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  }, 'Use 8-15 digits.');

export function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getMinBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);

  return getLocalDateString(date);
}

export function getMaxBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 30);

  return getLocalDateString(date);
}

export function isValidBookingDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const parsedDate = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return false;

  return date >= getMinBookingDate() && date <= getMaxBookingDate();
}

export const serviceRequestSchema = z.object({
  service: serviceSlugSchema,
  propertyType: propertyTypeSchema,
  address: z.string().trim().min(6).max(240),
  unit: z.string().trim().max(120).optional().default(''),
  accessNotes: z.string().trim().max(500).optional().default(''),
  acUnits: z.coerce.number().int().min(1).max(20).default(1),
  date: z.string().refine(isValidBookingDate, 'Choose a date in the next 30 days.'),
  timeWindow: timeWindowSchema,
  name: z.string().trim().min(2).max(120),
  phone: phoneSchema,
  email: emailSchema,
  notes: z.string().trim().max(1000).optional().default(''),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

export const technicianApplicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: phoneSchema,
  whatsapp: phoneSchema,
  yearsExperience: z.coerce.number().int().min(0).max(60),
  serviceSlugs: z.array(serviceSlugSchema).min(1).max(10),
  tools: z.string().trim().max(1000).optional().default(''),
  previousWork: z.string().trim().max(1500).optional().default(''),
  consentBackgroundCheck: z.literal(true),
});

export type TechnicianApplicationInput = z.infer<typeof technicianApplicationSchema>;

export const serviceRequestUpdateSchema = z.object({
  status: requestStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  quoteAmountBaht: z.coerce.number().int().min(0).max(5_000_000).nullable().optional(),
  quoteNotes: z.string().trim().max(1000).nullable().optional(),
  technicianName: z.string().trim().max(120).nullable().optional(),
  internalNotes: z.string().trim().max(2000).nullable().optional(),
});

export type ServiceRequestUpdateInput = z.infer<typeof serviceRequestUpdateSchema>;

export const technicianApplicationUpdateSchema = z.object({
  status: technicianApplicationStatusSchema.optional(),
  internalNotes: z.string().trim().max(2000).nullable().optional(),
});

export type TechnicianApplicationUpdateInput = z.infer<typeof technicianApplicationUpdateSchema>;
