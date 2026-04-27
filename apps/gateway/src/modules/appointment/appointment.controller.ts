import { Controller, Post, Body } from '@nestjs/common'
import { AppointmentService } from './appointment.service'

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createAppointment(body)
  }
}