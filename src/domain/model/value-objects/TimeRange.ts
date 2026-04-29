/**
 * Value Object — TimeRange
 *
 * Represents a bounded time interval with a start and end.
 * Enforces the invariant: start must be strictly before end.
 * Immutable: all operations return new instances.
 */
export class TimeRange {
  private readonly _start: Date
  private readonly _end: Date

  private constructor(start: Date, end: Date) {
    if (start >= end) {
      throw new Error(
        `Invalid TimeRange: start (${start.toISOString()}) must be before end (${end.toISOString()})`
      )
    }
    this._start = new Date(start)
    this._end = new Date(end)
  }

  static of(start: Date, end: Date): TimeRange {
    return new TimeRange(start, end)
  }

  /**
   * Factory — build a TimeRange from a start date and a duration in minutes.
   * Typical use: a 30-minute or 60-minute appointment slot.
   */
  static fromStartAndDuration(start: Date, durationMinutes: number): TimeRange {
    if (durationMinutes <= 0) {
      throw new Error("Duration must be a positive number of minutes")
    }
    const end = new Date(start.getTime() + durationMinutes * 60_000)
    return new TimeRange(start, end)
  }

  get start(): Date {
    return new Date(this._start)
  }

  get end(): Date {
    return new Date(this._end)
  }

  get durationMinutes(): number {
    return (this._end.getTime() - this._start.getTime()) / 60_000
  }

  /** Returns true if this range overlaps with another */
  overlaps(other: TimeRange): boolean {
    return this._start < other._end && this._end > other._start
  }

  /** Returns true if this range fully contains a given date */
  contains(date: Date): boolean {
    return date >= this._start && date < this._end
  }

  equals(other: TimeRange): boolean {
    return (
      this._start.getTime() === other._start.getTime() &&
      this._end.getTime() === other._end.getTime()
    )
  }

  toString(): string {
    return `[${this._start.toISOString()} → ${this._end.toISOString()}]`
  }
}