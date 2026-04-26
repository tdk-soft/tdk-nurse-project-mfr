export default function AppointmentTable() {
  // 🧠 futur: fetch DB / API
  const appointments = [
    {
      name: 'Jean Dupont',
      date: '2026-04-26',
      time: '10:00',
      status: 'confirmed'
    }
  ]

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">
        Rendez-vous récents
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-sm">
            <th>Nom</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{a.name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>
                <span className="text-green-600 font-medium">
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}