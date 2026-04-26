"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema, AppointmentFormData } from "@/domain/appointment.schema"

type Props = {
  serviceType: "soin" | "prise_sang" | "cabinet"
}

export default function AppointmentForm({ serviceType }: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      serviceType
    }
  })

  const onSubmit = async (data: AppointmentFormData) => {
    console.log("DATA:", data)

    await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Nom */}
      <div>
        <input {...register("name")} className="input" placeholder="Nom complet" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Téléphone */}
      <div>
        <input {...register("phone")} className="input" placeholder="Téléphone" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <input {...register("email")} className="input" placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Adresse conditionnelle */}
      {serviceType === "soin" && (
        <>
          <div>
            <input {...register("address")} className="input" placeholder="Adresse" />
          </div>
          <div>
            <input {...register("city")} className="input" placeholder="Ville" />
          </div>
        </>
      )}

      {/* Date */}
      <div>
        <input type="date" {...register("date")} className="input" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      {/* Heure */}
      <div>
        <input type="time" {...register("time")} className="input" />
        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
      </div>

      {/* Message */}
      <textarea {...register("message")} className="input" placeholder="Message (optionnel)" />

      {/* Hidden service */}
      <input type="hidden" value={serviceType} {...register("serviceType")} />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? "Envoi..." : "Confirmer le rendez-vous"}
      </button>
    </form>
  )
}