"use client"

type Props = {
  slots: string[]
  selected?: string
  onSelect: (slot: string) => void
}

export default function TimeSlotPicker({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
      {slots.map(slot => (
        <button
          key={slot}
          type="button"
          onClick={() => onSelect(slot)}
          className={`
            py-2 rounded-lg text-sm border transition
            ${selected === slot
              ? "bg-sky-600 text-white border-sky-600"
              : "bg-white text-slate-700 hover:bg-sky-50"}
          `}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}