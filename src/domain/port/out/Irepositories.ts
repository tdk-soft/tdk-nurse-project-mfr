import { Appointment } from "../model/Appointment"
import { TimeSlot } from "../model/TimeSlot"

// ── Repository Ports (Driven Ports) ──────────────────────────────────────

/**
 * Port OUT — IAppointmentRepository
 *
 * Driven port: implemented by the Prisma persistence adapter.
 * The domain and application layers depend ONLY on this interface.
 * Prisma is never imported above the adapter layer.
 */
export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>
  findById(id: string): Promise<Appointment | null>
  findBySlotId(slotId: string): Promise<Appointment | null>
  findByPractitionerId(practitionerId: string): Promise<Appointment[]>
  update(appointment: Appointment): Promise<void>
}

/**
 * Port OUT — ITimeSlotRepository
 *
 * Manages persistence of TimeSlot aggregates.
 */
export interface ITimeSlotRepository {
  save(slot: TimeSlot): Promise<void>
  findById(id: string): Promise<TimeSlot | null>
  findAvailableByPractitioner(
    practitionerId: string,
    from: Date,
    to: Date
  ): Promise<TimeSlot[]>
  update(slot: TimeSlot): Promise<void>
}


