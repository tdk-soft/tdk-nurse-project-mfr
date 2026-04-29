import { randomUUID } from "crypto"

/**
 * Practitioner Specialty — métier médical/paramédical
 * Extensible sans modifier les entités existantes (Open/Closed)
 */
export enum PractitionerSpecialty {
  GENERAL_PRACTITIONER = "GENERAL_PRACTITIONER",
  NURSE = "NURSE",
  PHYSIOTHERAPIST = "PHYSIOTHERAPIST",
  SPEECH_THERAPIST = "SPEECH_THERAPIST",       // Logopède
  OCCUPATIONAL_THERAPIST = "OCCUPATIONAL_THERAPIST", // Ergothérapeute
  DENTIST = "DENTIST",
  OPHTHALMOLOGIST = "OPHTHALMOLOGIST",
  PSYCHOLOGIST = "PSYCHOLOGIST",
  OTHER = "OTHER",
}

/**
 * Practitioner Status
 */
export enum PractitionerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

/**
 * Value Object — PractitionerName
 * Encapsule prénom + nom comme unité cohérente
 */
export class PractitionerName {
  private readonly _firstName: string
  private readonly _lastName: string

  private constructor(firstName: string, lastName: string) {
    if (!firstName || firstName.trim().length < 1) {
      throw new Error("Practitioner first name cannot be empty")
    }
    if (!lastName || lastName.trim().length < 1) {
      throw new Error("Practitioner last name cannot be empty")
    }
    this._firstName = firstName.trim()
    this._lastName = lastName.trim()
  }

  static of(firstName: string, lastName: string): PractitionerName {
    return new PractitionerName(firstName, lastName)
  }

  get firstName(): string { return this._firstName }
  get lastName(): string { return this._lastName }
  get fullName(): string { return `${this._firstName} ${this._lastName}` }

  equals(other: PractitionerName): boolean {
    return this._firstName === other._firstName &&
      this._lastName === other._lastName
  }

  toString(): string { return this.fullName }
}

/**
 * Entity — Practitioner
 *
 * Represents a healthcare professional who offers appointments.
 * Examples: infirmier freelance, ergothérapeute, logopède, médecin.
 *
 * Invariants:
 *   - A practitioner must have at least one specialty
 *   - A SUSPENDED practitioner cannot create new time slots
 *   - Email is unique — enforced at the repository level
 *   - An INACTIVE practitioner's slots remain but are not bookable
 */
export class Practitioner {
  private readonly _id: string
  private _name: PractitionerName
  private readonly _email: string
  private _phone: string
  private _specialties: Set<PractitionerSpecialty>
  private _status: PractitionerStatus
  private readonly _createdAt: Date
  private _bio: string | null
  private _avatarUrl: string | null

  private constructor(params: {
    id: string
    name: PractitionerName
    email: string
    phone: string
    specialties: PractitionerSpecialty[]
    status: PractitionerStatus
    createdAt: Date
    bio: string | null
    avatarUrl: string | null
  }) {
    this._id = params.id
    this._name = params.name
    this._email = params.email
    this._phone = params.phone
    this._specialties = new Set(params.specialties)
    this._status = params.status
    this._createdAt = params.createdAt
    this._bio = params.bio
    this._avatarUrl = params.avatarUrl
  }

  // ── Factories ─────────────────────────────────────────────────────

  /**
   * Register a new practitioner.
   * At least one specialty must be provided.
   */
  static register(params: {
    name: PractitionerName
    email: string
    phone: string
    specialties: PractitionerSpecialty[]
    bio?: string
    avatarUrl?: string
  }): Practitioner {
    if (!params.specialties || params.specialties.length === 0) {
      throw new Error("A practitioner must have at least one specialty")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(params.email)) {
      throw new Error(`Invalid practitioner email: "${params.email}"`)
    }

    return new Practitioner({
      id: randomUUID(),
      name: params.name,
      email: params.email.trim().toLowerCase(),
      phone: params.phone.trim(),
      specialties: params.specialties,
      status: PractitionerStatus.ACTIVE,
      createdAt: new Date(),
      bio: params.bio ?? null,
      avatarUrl: params.avatarUrl ?? null,
    })
  }

  /** Rehydrate from persistence — bypasses business rules */
  static reconstitute(params: {
    id: string
    name: PractitionerName
    email: string
    phone: string
    specialties: PractitionerSpecialty[]
    status: PractitionerStatus
    createdAt: Date
    bio: string | null
    avatarUrl: string | null
  }): Practitioner {
    return new Practitioner(params)
  }

  // ── Business behaviour ────────────────────────────────────────────

  /**
   * Suspend this practitioner.
   * A suspended practitioner cannot offer new slots.
   *
   * @throws if already suspended
   */
  suspend(): void {
    if (this._status === PractitionerStatus.SUSPENDED) {
      throw new Error(`Practitioner "${this._id}" is already suspended`)
    }
    this._status = PractitionerStatus.SUSPENDED
  }

  /** Reactivate a suspended or inactive practitioner */
  activate(): void {
    this._status = PractitionerStatus.ACTIVE
  }

  /** Deactivate — soft removal, preserves history */
  deactivate(): void {
    if (this._status === PractitionerStatus.SUSPENDED) {
      throw new Error("Cannot deactivate a suspended practitioner. Activate first.")
    }
    this._status = PractitionerStatus.INACTIVE
  }

  /** Add a new specialty */
  addSpecialty(specialty: PractitionerSpecialty): void {
    this._specialties.add(specialty)
  }

  /** Remove a specialty — at least one must remain */
  removeSpecialty(specialty: PractitionerSpecialty): void {
    if (this._specialties.size <= 1) {
      throw new Error("A practitioner must retain at least one specialty")
    }
    this._specialties.delete(specialty)
  }

  /** Update profile info */
  updateProfile(params: {
    name?: PractitionerName
    phone?: string
    bio?: string
    avatarUrl?: string
  }): void {
    if (params.name) this._name = params.name
    if (params.phone) this._phone = params.phone.trim()
    if (params.bio !== undefined) this._bio = params.bio
    if (params.avatarUrl !== undefined) this._avatarUrl = params.avatarUrl
  }

  /**
   * Guard — called before creating a TimeSlot for this practitioner.
   * The domain enforces this rule explicitly rather than relying on
   * implicit checks scattered across services.
   *
   * @throws if the practitioner cannot accept new bookings
   */
  assertCanAcceptBookings(): void {
    if (this._status !== PractitionerStatus.ACTIVE) {
      throw new Error(
        `Practitioner "${this._name.fullName}" is ${this._status} and cannot accept new bookings`
      )
    }
  }

  // ── Queries ───────────────────────────────────────────────────────

  get id(): string { return this._id }
  get name(): PractitionerName { return this._name }
  get email(): string { return this._email }
  get phone(): string { return this._phone }
  get specialties(): PractitionerSpecialty[] { return [...this._specialties] }
  get status(): PractitionerStatus { return this._status }
  get createdAt(): Date { return new Date(this._createdAt) }
  get bio(): string | null { return this._bio }
  get avatarUrl(): string | null { return this._avatarUrl }

  isActive(): boolean { return this._status === PractitionerStatus.ACTIVE }
  isSuspended(): boolean { return this._status === PractitionerStatus.SUSPENDED }

  hasSpecialty(specialty: PractitionerSpecialty): boolean {
    return this._specialties.has(specialty)
  }
}