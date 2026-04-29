import { AppointmentId } from "./value-objects/AppointmentId"
import { ContactInfo } from "./value-objects/ContactInfo"
import { TimeRange } from "./value-objects/TimeRange"

/**
 * Appointment Status — internal lifecycle
 */
export enum AppointmentStatus {
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

/**
 * Entity — Appointment
 *
 * Records the confirmed booking of a TimeSlot by a patient.
 * Created only after a TimeSlot has been successfully booked
 * (i.e. TimeSlot.book() has been called and returned an AppointmentId).
 *
 * Invariants:
 *   - An Appointment always has a valid ContactInfo
 *   - An Appointment always references a slotId and a practitionerId
 *   - A COMPLETED appointment cannot be cancelled
 *   - createdAt is immutable after construction
 */
export class Appointment {
  private readonly _id: AppointmentId
  private readonly _slotId: string
  private readonly _practitionerId: string
  private readonly _serviceType: string
  private readonly _contact: ContactInfo
  private readonly _timeRange: TimeRange
  private readonly _createdAt: Date
  private _status: AppointmentStatus
  private _message: string | null
  private _address: string | null
  private _city: string | null

  private constructor(params: {
    id: AppointmentId
    slotId: string
    practitionerId: string
    serviceType: string
    contact: ContactInfo
    timeRange: TimeRange
    status: AppointmentStatus
    message: string | null
    address: string | null
    city: string | null
    createdAt: Date
  }) {
    this._id = params.id
    this._slotId = params.slotId
    this._practitionerId = params.practitionerId
    this._serviceType = params.serviceType
    this._contact = params.contact
    this._timeRange = params.timeRange
    this._status = params.status
    this._message = params.message
    this._address = params.address
    this._city = params.city
    this._createdAt = params.createdAt
  }

  // ── Factory — creation ────────────────────────────────────────────

  /**
   * Create a new confirmed appointment after a slot has been booked.
   * The AppointmentId comes from TimeSlot.book() — it is the same ID
   * stored in the slot, ensuring referential consistency.
   */
  static create(params: {
    id: AppointmentId
    slotId: string
    practitionerId: string
    serviceType: string
    contact: ContactInfo
    timeRange: TimeRange
    message?: string
    address?: string
    city?: string
  }): Appointment {
    return new Appointment({
      ...params,
      status: AppointmentStatus.CONFIRMED,
      message: params.message ?? null,
      address: params.address ?? null,
      city: params.city ?? null,
      createdAt: new Date(),
    })
  }

  /** Rehydrate from persistence — bypasses business rules */
  static reconstitute(params: {
    id: AppointmentId
    slotId: string
    practitionerId: string
    serviceType: string
    contact: ContactInfo
    timeRange: TimeRange
    status: AppointmentStatus
    message: string | null
    address: string | null
    city: string | null
    createdAt: Date
  }): Appointment {
    return new Appointment(params)
  }

  // ── Business behaviour ────────────────────────────────────────────

  /**
   * Cancel this appointment.
   * A COMPLETED appointment cannot be cancelled.
   *
   * @throws {Error} if already completed
   */
  cancel(): void {
    if (this._status === AppointmentStatus.COMPLETED) {
      throw new Error("Cannot cancel a completed appointment")
    }
    this._status = AppointmentStatus.CANCELLED
  }

  /**
   * Mark this appointment as completed (patient seen).
   *
   * @throws {Error} if already cancelled
   */
  complete(): void {
    if (this._status === AppointmentStatus.CANCELLED) {
      throw new Error("Cannot complete a cancelled appointment")
    }
    this._status = AppointmentStatus.COMPLETED
  }

  // ── Queries ───────────────────────────────────────────────────────

  get id(): AppointmentId {
    return this._id
  }

  get slotId(): string {
    return this._slotId
  }

  get practitionerId(): string {
    return this._practitionerId
  }

  get serviceType(): string {
    return this._serviceType
  }

  get contact(): ContactInfo {
    return this._contact
  }

  get timeRange(): TimeRange {
    return this._timeRange
  }

  get status(): AppointmentStatus {
    return this._status
  }

  get message(): string | null {
    return this._message
  }

  get address(): string | null {
    return this._address
  }

  get city(): string | null {
    return this._city
  }

  get createdAt(): Date {
    return new Date(this._createdAt)
  }

  isConfirmed(): boolean {
    return this._status === AppointmentStatus.CONFIRMED
  }

  isCancelled(): boolean {
    return this._status === AppointmentStatus.CANCELLED
  }
}