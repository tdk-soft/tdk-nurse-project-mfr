import { Appointment } from "../model/Appointment"
import { TimeSlot } from "../model/TimeSlot"

// ── Commands & Queries (objets d'intention) ───────────────────────────────

export interface BookAppointmentCommand {
  slotId: string
  practitionerId: string
  serviceType: string
  name: string
  email: string
  phone: string
  message?: string
  address?: string
  city?: string
}

export interface GetAvailableSlotsQuery {
  practitionerId: string
  from: Date
  to: Date
}

export interface CancelAppointmentCommand {
  appointmentId: string
  slotId: string
}

// ── Use Case Interfaces (Driving Ports) ──────────────────────────────────

/**
 * Port IN — IBookAppointmentUseCase
 *
 * Driving port: called by the HTTP adapter (Next.js route handler).
 * The application layer implements this interface.
 * The HTTP adapter depends ONLY on this interface — never on the
 * concrete use case class.
 */
export interface IBookAppointmentUseCase {
  execute(command: BookAppointmentCommand): Promise<Appointment>
}

/**
 * Port IN — IGetAvailableSlotsUseCase
 *
 * Returns available slots for a practitioner in a given date range.
 */
export interface IGetAvailableSlotsUseCase {
  execute(query: GetAvailableSlotsQuery): Promise<TimeSlot[]>
}

/**
 * Port IN — ICancelAppointmentUseCase
 *
 * Cancels both the Appointment entity and releases the TimeSlot.
 */
export interface ICancelAppointmentUseCase {
  execute(command: CancelAppointmentCommand): Promise<void>
}