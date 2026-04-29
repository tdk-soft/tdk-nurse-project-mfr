export default () => ({
  services: {
    appointment: process.env.APPOINTMENT_SERVICE_URL || 'http://appointment-service',
  },
})