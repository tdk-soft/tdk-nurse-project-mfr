/**
 * Value Object — ContactInfo
 *
 * Groups the contact details of a patient who books an appointment.
 * Immutable. Validates format on construction.
 * Avoids primitive obsession: instead of passing name/email/phone
 * as loose strings, they travel together as a coherent unit.
 */
export class ContactInfo {
  private readonly _name: string
  private readonly _email: string
  private readonly _phone: string

  private constructor(name: string, email: string, phone: string) {
    ContactInfo.assertValidName(name)
    ContactInfo.assertValidEmail(email)
    ContactInfo.assertValidPhone(phone)

    this._name = name.trim()
    this._email = email.trim().toLowerCase()
    this._phone = phone.trim()
  }

  static of(name: string, email: string, phone: string): ContactInfo {
    return new ContactInfo(name, email, phone)
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get phone(): string {
    return this._phone
  }

  equals(other: ContactInfo): boolean {
    return (
      this._name === other._name &&
      this._email === other._email &&
      this._phone === other._phone
    )
  }

  toString(): string {
    return `${this._name} <${this._email}> ${this._phone}`
  }

  // ── Private validators ────────────────────────────────────────────

  private static assertValidName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error("Contact name must be at least 2 characters")
    }
  }

  private static assertValidEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error(`Invalid email address: "${email}"`)
    }
  }

  private static assertValidPhone(phone: string): void {
    // Accepts international formats: +32 470 12 34 56, 0470123456, etc.
    const phoneRegex = /^\+?[\d\s\-().]{7,20}$/
    if (!phoneRegex.test(phone)) {
      throw new Error(`Invalid phone number: "${phone}"`)
    }
  }
}