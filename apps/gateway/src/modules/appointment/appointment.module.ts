import { Module, HttpModule } from '@nestjs/common'
import { AppointmentController } from './appointment.controller'
import { AppointmentService } from './appointment.service'

@Module({
  imports: [HttpModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}