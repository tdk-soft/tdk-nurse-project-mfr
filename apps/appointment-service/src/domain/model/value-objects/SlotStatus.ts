/**
 * Value Object — SlotStatus
 *
 * Represents the lifecycle state of a TimeSlot.
 * Modelled as a discriminated string enum for type safety,
 * serialization compatibility, and readable persistence.
 *
 * Allowed transitions:
 *   AVAILABLE → BOOKED      (when a patient books)
 *   AVAILABLE → BLOCKED     (when practitioner blocks manually)
 *   BOOKED    → CANCELLED   (when patient or practitioner cancels)
 *   BLOCKED   → AVAILABLE   (when practitioner unblocks)
 */
export enum SlotStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  CANCELLED = "CANCELLED",
  BLOCKED = "BLOCKED",
}

/** Type guard — narrows unknown to SlotStatus */
export function isSlotStatus(value: unknown): value is SlotStatus {
  return Object.values(SlotStatus).includes(value as SlotStatus)
}

/** Allowed transitions map — enforces state machine rules */
const ALLOWED_TRANSITIONS: Record<SlotStatus, SlotStatus[]> = {
  [SlotStatus.AVAILABLE]: [SlotStatus.BOOKED, SlotStatus.BLOCKED],
  [SlotStatus.BOOKED]: [SlotStatus.CANCELLED],
  [SlotStatus.BLOCKED]: [SlotStatus.AVAILABLE],
  [SlotStatus.CANCELLED]: [],
}

export function canTransition(from: SlotStatus, to: SlotStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to)
}