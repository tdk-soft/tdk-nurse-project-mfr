// ── Notification Port (Driven Port) ──────────────────────────────────────

export interface AppointmentNotificationPayload {
  to: string          // patient email
  patientName: string
  practitionerName: string
  serviceType: string
  appointmentDate: Date
  appointmentEnd: Date
  address?: string
  city?: string
}
