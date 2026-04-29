import AppointmentContainer from "./AppointmentContainer"

export default function AppointmentLayout() {
  return (
    <main className="min-h-screen bg-medical-light py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-medical-dark">
            Prendre rendez-vous
          </h1>
          <p className="text-slate-500">
            Simple, rapide et sécurisé
          </p>
        </div>

        {/* Core Feature */}
        <AppointmentContainer />
      </div>
    </main>
  )
}