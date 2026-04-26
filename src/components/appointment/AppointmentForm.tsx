"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  appointmentSchema,
  AppointmentFormData
} from "@/domain/appointment.schema"

import { getAvailableSlots } from "@/domain/availability"
import TimeSlotPicker from "./TimeSlotPicker"

type Props = {
  serviceType: "soin" | "prise_sang" | "cabinet"
}

export default function AppointmentForm({ serviceType }: Props) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      serviceType
    }
  })

  const slots = selectedDate ? getAvailableSlots(selectedDate) : []

  const onSubmit = async (data: AppointmentFormData) => {
    if (!selectedTime) return

    const payload = {
      ...data,
      time: selectedTime
    }

    console.log("APPOINTMENT:", payload)

    await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Nom */}
      <div>
        <input
          {...register("name")}
          placeholder="Nom complet"
          className={`input ${errors.name ? "input-error" : ""}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <input
          {...register("phone")}
          placeholder="Téléphone"
          className={`input ${errors.phone ? "input-error" : ""}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className={`input ${errors.email ? "input-error" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Adresse (uniquement soins à domicile) */}
      {serviceType === "soin" && (
        <div className="grid md:grid-cols-2 gap-4">
          <input
            {...register("address")}
            placeholder="Adresse"
            className="input"
          />
          <input
            {...register("city")}
            placeholder="Ville"
            className="input"
          />
        </div>
      )}

      {/* Date */}
      <div>
        <input
          type="date"
          className={`input ${errors.date ? "input-error" : ""}`}
          {...register("date")}
          onChange={(e) => {
            setSelectedDate(e.target.value)
            setSelectedTime("")
            setValue("time", "")
          }}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Créneaux */}
      {selectedDate && (
        <div>
          <p className="text-sm text-slate-500 mb-2">
            Choisissez un créneau disponible
          </p>

          <TimeSlotPicker
            slots={slots}
            selected={selectedTime}
            onSelect={(slot) => {
              setSelectedTime(slot)
              setValue("time", slot)
            }}
          />

          {!selectedTime && (
            <p className="text-red-500 text-sm mt-2">
              Veuillez choisir un créneau
            </p>
          )}
        </div>
      )}

      {/* Message */}
      <textarea
        {...register("message")}
        placeholder="Message (optionnel)"
        className="input"
      />

      {/* Hidden fields */}
      <input type="hidden" value={serviceType} {...register("serviceType")} />

      {/* Submit */}
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