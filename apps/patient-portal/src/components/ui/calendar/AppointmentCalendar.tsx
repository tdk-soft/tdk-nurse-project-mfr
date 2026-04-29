'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type Props = {
  onDateSelect: (date: Date) => void
}

export default function AppointmentCalendar({ onDateSelect }: Props) {
  const [selected, setSelected] = useState<Date | undefined>()

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    setSelected(date)
    onDateSelect(date)
  }

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">
        Choisissez une date
      </h3>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={{ before: new Date() }}
        className="text-sm"
      />

      {selected && (
        <p className="mt-4 text-slate-600">
          Date sélectionnée :{' '}
          <span className="font-semibold text-sky-600">
            {selected.toLocaleDateString('fr-FR')}
          </span>
        </p>
      )}
    </div>
  )
}