import { Injectable, HttpService } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AppointmentService {
  constructor(private readonly http: HttpService) {}

  async createAppointment(data: any) {
    const res = await firstValueFrom(
      this.http.post(
        process.env.APPOINTMENT_SERVICE_URL + '/appointments',
        data
      )
    )

    return res.data
  }
}