export class Appointment {
  constructor(
    public readonly id: string,
    public name: string,
    public phone: string,
    public email: string,
    public serviceType: string,
    public date: string,
    public time: string,
    public createdAt: Date
  ) {}

  static create(props: {
    name: string
    phone: string
    email: string
    serviceType: string
    date: string
    time: string
  }) {
    return new Appointment(
      crypto.randomUUID(),
      props.name,
      props.phone,
      props.email,
      props.serviceType,
      props.date,
      props.time,
      new Date()
    )
  }
}