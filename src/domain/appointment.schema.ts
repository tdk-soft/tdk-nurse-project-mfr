import { z } from "zod"

export const appointmentSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  phone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email("Email invalide"),

  serviceType: z.enum(["soin", "prise_sang", "cabinet"]),

  address: z.string().optional(),
  city: z.string().optional(),

  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),

  message: z.string().optional()
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>