export abstract class AppointmentRepository {
  abstract save(appointment: Appointment): Promise<void>
  abstract findByDateTime(date: string, time: string): Promise<Appointment | null>
}