import { Injectable } from '@nestjs/common'
import { HttpService } from '../../infrastructure/http/http.service'
import { SERVICES } from '../../shared/constants/services'

@Injectable()
export class AppointmentProxy {
  constructor(private readonly http: HttpService) {}

  async createAppointment(payload: any) {
    return this.http.post(
      `${SERVICES.APPOINTMENT_SERVICE}/appointments`,
      payload
    )
  }

  async getAppointments() {
    return this.http.get(
      `${SERVICES.APPOINTMENT_SERVICE}/appointments`
    )
  }
}