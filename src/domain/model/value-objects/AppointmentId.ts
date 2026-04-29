import { randomUUID } from "crypto"

/**
 * Value Object — AppointmentId
 *
 * Encapsulates the identity of an Appointment.
 * Immutable by design: once created, the value never changes.
 */
export class AppointmentId {
  private readonly _value: string

  private constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("AppointmentId cannot be empty")
    }
    this._value = value
  }

  /** Factory — generate a new unique identity */
  static generate(): AppointmentId {
    return new AppointmentId(randomUUID())
  }

  /** Factory — rehydrate from persistence */
  static from(value: string): AppointmentId {
    return new AppointmentId(value)
  }

  get value(): string {
    return this._value
  }

  equals(other: AppointmentId): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }