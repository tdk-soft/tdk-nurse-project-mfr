export const WORKING_HOURS = {
  start: 8,
  end: 18
}

export const SLOT_DURATION = 30 // minutes

export function generateTimeSlots(): string[] {
  const slots: string[] = []

  for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`)
    slots.push(`${hour.toString().padStart(2, "0")}:30`)
  }

  return slots
}

/**
 * Simule des créneaux déjà pris (plus tard → DB)
 */
export function getUnavailableSlots(date: string): string[] {
  // Simulation
  if (date.endsWith("01")) return ["10:00", "14:30"]
  if (date.endsWith("02")) return ["09:00", "11:30"]

  return []
}

export function getAvailableSlots(date: string): string[] {
  const all = generateTimeSlots()
  const unavailable = getUnavailableSlots(date)

  return all.filter(slot => !unavailable.includes(slot))
}