/**
 * Domain Exceptions
 *
 * These are business rule violations — not technical errors.
 * They carry semantic meaning and are caught by the adapter layer
 * to be translated into the appropriate HTTP response (400, 404, 409…).
 *
 * Rule: never import framework-specific types here.
 */

export class DomainException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

/** Thrown when attempting to book a slot that is not AVAILABLE */
export class SlotUnavailableException extends DomainException {
  constructor(slotId: string) {
    super(`Slot "${slotId}" is not available for booking`)
  }
}

/** Thrown when a TimeSlot cannot be found */
export class SlotNotFoundException extends DomainException {
  constructor(slotId: string) {
    super(`TimeSlot with id "${slotId}" was not found`)
  }
}

/** Thrown when an Appointment cannot be found */
export class AppointmentNotFoundException extends DomainException {
  constructor(appointmentId: string) {
    super(`Appointment with id "${appointmentId}" was not found`)
  }
}

/** Thrown when attempting an invalid status transition */
export class InvalidSlotTransitionException extends DomainException {
  constructor(from: string, to: string) {
    super(`Cannot transition slot from status "${from}" to "${to}"`)
  }
}

/** Thrown when attempting to cancel a completed appointment */
export class AppointmentAlreadyCompletedException extends DomainException {
  constructor(appointmentId: string) {
    super(`Appointment "${appointmentId}" is already completed and cannot be cancelled`)
  }
}