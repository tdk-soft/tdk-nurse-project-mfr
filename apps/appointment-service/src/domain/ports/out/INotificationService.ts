import { AppointmentNotificationPayload } from "./AppointmentNotificationPayload"

/**
 * Port OUT — INotificationService
 *
 * Driven port: implemented by the email adapter (Resend, Nodemailer…).
 * The use case triggers a notification without knowing the
 * underlying delivery mechanism.
 */

export interface INotificationService {
  sendAppointmentConfirmation(
    payload: AppointmentNotificationPayload
  ): Promise<void>

  sendAppointmentCancellation(
    payload: AppointmentNotificationPayload
  ): Promise<void>
}