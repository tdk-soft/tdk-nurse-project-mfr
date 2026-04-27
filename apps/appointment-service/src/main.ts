import { NestFactory } from "@nestjs/core"
import { AppointmentModule } from "./appointment.module"

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule)

  app.enableCors()

  await app.listen(3001)
}
bootstrap()