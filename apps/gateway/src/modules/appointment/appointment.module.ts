import { Module } from '@nestjs/common'
import { AppointmentController } from './appointment.controller'
import { AppointmentProxy } from './appointment.proxy'
import { HttpService } from '../../infrastructure/http/http.service'

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentProxy, HttpService]
})
export class AppointmentModule {}