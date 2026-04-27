import { Module } from "@nestjs/common"
import { AppointmentController } from "./presentation/controllers/appointment.controller"
import { CreateAppointmentUseCase } from "./application/use-cases/create-appointment.usecase"
import { PrismaService } from "./infrastructure/prisma/prisma.service"
import { PrismaAppointmentRepository } from "./infrastructure/repositories/prisma-appointment.repository"
import { AppointmentRepository } from "./domain/repositories/appointment.repository"

@Module({
  controllers: [AppointmentController],
  providers: [
    PrismaService,
    CreateAppointmentUseCase,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository
    }
  ]
})
export class AppointmentModule {}