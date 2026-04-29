import { randomUUID } from "crypto"
import { TimeRange } from "./value-objects/TimeRange"
import { SlotStatus, canTransition } from "./value-objects/SlotStatus"
import { AppointmentId } from "./value-objects/AppointmentId"

/**
 * Entity — TimeSlot (Aggregate Root)
 *
 * Represents a bookable time window offered by a practitioner.
 * This is the central aggregate of the scheduling bounded context.
 *
 * Invariants enforced:
 *   - A slot can only be booked when AVAILABLE
 *   - A slot can only be cancelled when BOOKED
 *   - A slot can only be blocked/unblocked by the practitioner
 *   - Status transitions follow the defined state machine (SlotStatus)
 *   - A booked slot holds a reference to exactly one AppointmentId
 */
export class TimeSlot {
  private readonly _id: string
  private readonly _practitionerId: string
  private readonly _timeRange: TimeRange
  private _status: SlotStatus
  private _appointmentId: AppointmentId | null

  private constructor(
    id: string,
    practitionerId: string,
    timeRange: TimeRange,
    status: SlotStatus,
    appointmentId: AppointmentId | null = null
  ) {
    this._id = id
    this._practitionerId = practitionerId
    this._timeRange = timeRange
    this._status = status
    this._appointmentId = appointmentId
  }

  // ── Factories ─────────────────────────────────────────────────────

  /** Create a new available slot — used by the practitioner */
  static createAvailable(
    practitionerId: string,
    timeRange: TimeRange
  ): TimeSlot {
    return new TimeSlot(
      randomUUID(),
      practitionerId,
      timeRange,
      SlotStatus.AVAILABLE
    )
  }

  /** Rehydrate from persistence — never triggers business rules */
  static reconstitute(
    id: string,
    practitionerId: string,
    timeRange: TimeRange,
    status: SlotStatus,
    appointmentId: AppointmentId | null
  ): TimeSlot {
    return new TimeSlot(id, practitionerId, timeRange, status, appointmentId)
  }

  // ── Business behaviour ────────────────────────────────────────────

  /**
   * Book this slot for a patient.
   * Returns the generated AppointmentId to be used when creating
   * the Appointment entity.
   *
   * @throws {Error} if the slot is not AVAILABLE
   */
  book(): AppointmentId {
    this.assertTransition(SlotStatus.BOOKED)

    const appointmentId = AppointmentId.generate()
    this._appointmentId = appointmentId
    this._status = SlotStatus.BOOKED
    return appointmentId
  }

  /**
   * Cancel this slot — releases it back as CANCELLED.
   * The practitioner may later create a new AVAILABLE slot
   * for the same time range if needed.
   *
   * @throws {Error} if the slot is not BOOKED
   */
  cancel(): void {
    this.assertTransition(SlotStatus.CANCELLED)
    this._status = SlotStatus.CANCELLED
    this._appointmentId = null
  }

  /**
   * Block this slot — prevents any booking.
   * Typically used for lunch breaks, holidays, etc.
   *
   * @throws {Error} if the slot is not AVAILABLE
   */
  block(): void {
    this.assertTransition(SlotStatus.BLOCKED)
    this._status = SlotStatus.BLOCKED
  }

  /**
   * Unblock a previously blocked slot.
   *
   * @throws {Error} if the slot is not BLOCKED
   */
  unblock(): void {
    this.assertTransition(SlotStatus.AVAILABLE)
    this._status = SlotStatus.AVAILABLE
  }

  // ── Queries ───────────────────────────────────────────────────────

  get id(): string {
    return this._id
  }

  get practitionerId(): string {
    return this._practitionerId
  }

  get timeRange(): TimeRange {
    return this._timeRange
  }

  get status(): SlotStatus {
    return this._status
  }

  get appointmentId(): AppointmentId | null {
    return this._appointmentId
  }

  isAvailable(): boolean {
    return this._status === SlotStatus.AVAILABLE
  }

  isBooked(): boolean {
    return this._status === SlotStatus.BOOKED
  }

  overlaps(other: TimeSlot): boolean {
    return this._timeRange.overlaps(other._timeRange)
  }

  // ── Private guards ────────────────────────────────────────────────

  private assertTransition(to: SlotStatus): void {
    if (!canTransition(this._status, to)) {
      throw new Error(
        `Invalid transition: cannot move slot from ${this._status} to ${to}`
      )
    }
  }
}