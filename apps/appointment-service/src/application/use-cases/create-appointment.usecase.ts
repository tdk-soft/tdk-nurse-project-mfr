import { Injectable } from "@nestjs/common"
import { AppointmentRepository } from "../../domain/repositories/appointment.repository"
import { Appointment } from "../../domain/entities/appointment.entity"

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly repo: AppointmentRepository) {}

  async execute(data: {
    name: string
    phone: string
    email: string
    serviceType: string
    date: string
    time: string
  }) {
    const existing = await this.repo.findByDateTime(data.date, data.time)

    if (existing) {
      throw new Error("Slot already booked")
    }

    const appointment = Appointment.create(data)

    await this.repo.save(appointment)

    return appointment
  }
}