import { ServiceType } from "./AppointmentContainer"

type Props = {
  value: ServiceType
  onChange: (value: ServiceType) => void
}

export default function AppointmentTabs({ value, onChange }: Props) {
  const tabs = [
    { id: "soin", label: "Soins à domicile" },
    { id: "prise_sang", label: "Prise de sang" },
    { id: "cabinet", label: "En cabinet" }
  ]

  return (
    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id as ServiceType)}
          className={`
            flex-1 py-2 rounded-lg text-sm font-medium transition
            ${value === tab.id 
              ? "bg-white shadow text-medical-dark"
              : "text-slate-500 hover:text-medical-dark"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}