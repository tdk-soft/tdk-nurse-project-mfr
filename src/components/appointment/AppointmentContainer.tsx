"use client"

import { useState } from "react"
import AppointmentTabs from "./AppointmentTabs"
import AppointmentForm from "./AppointmentForm"

export type ServiceType = "soin" | "prise_sang" | "cabinet"

export default function AppointmentContainer() {
  const [serviceType, setServiceType] = useState<ServiceType>("soin")

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <AppointmentTabs 
        value={serviceType} 
        onChange={setServiceType} 
      />

      <AppointmentForm serviceType={serviceType} />
    </div>
  )
}