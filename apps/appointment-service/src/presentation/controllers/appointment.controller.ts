import { Controller, Post, Body } from "@nestjs/common"
import { CreateAppointmentUseCase } from "../../application/use-cases/create-appointment.usecase"

@Controller("appointments")
export class AppointmentController {
  constructor(private readonly useCase: CreateAppointmentUseCase) {}

  @Post()
  async create(@Body() body: any) {
    return this.useCase.execute(body)
  }
}