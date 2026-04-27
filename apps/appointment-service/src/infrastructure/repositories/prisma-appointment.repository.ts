import { Injectable } from "@nestjs/common"
import { AppointmentRepository } from "../../domain/repositories/appointment.repository"
import { PrismaService } from "../prisma/prisma.service"
import { Appointment } from "../../domain/entities/appointment.entity"

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async save(appointment: Appointment): Promise<void> {
    await this.prisma.appointment.create({
      data: {
        id: appointment.id,
        name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        serviceType: appointment.serviceType,
        date: appointment.date,
        time: appointment.time,
        createdAt: appointment.createdAt
      }
    })
  }

  async findByDateTime(date: string, time: string) {
    const result = await this.prisma.appointment.findFirst({
      where: { date, time }
    })

    if (!result) return null

    return new Appointment(
      result.id,
      result.name,
      result.phone,
      result.email,
      result.serviceType,
      result.date,
      result.time,
      result.createdAt
    )
  }
}