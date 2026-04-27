import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { AppointmentModule } from './modules/appointment/appointment.module'
import { HealthController } from './modules/health/health.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AppointmentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}