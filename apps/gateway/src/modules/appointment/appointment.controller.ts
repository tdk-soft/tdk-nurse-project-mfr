import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppointmentProxy } from './appointment.proxy'

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly proxy: AppointmentProxy) {}

  @Post()
  async create(@Body() body: any) {
    return this.proxy.createAppointment(body)
  }

  @Get()
  async findAll() {
    return this.proxy.getAppointments()
  }
}