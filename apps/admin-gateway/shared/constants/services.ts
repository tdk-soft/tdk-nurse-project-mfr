export const SERVICES = {
  APPOINTMENT_SERVICE: process.env.APPOINTMENT_SERVICE_URL || 'http://appointment-service:3001',
  NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3002'
}