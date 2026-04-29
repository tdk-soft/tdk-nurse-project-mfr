export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-slate-500">Rendez-vous aujourd`&#39;`hui</p>
        <h2 className="text-2xl font-bold text-sky-600">12</h2>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-slate-500">Cette semaine</p>
        <h2 className="text-2xl font-bold text-sky-600">48</h2>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-slate-500">Taux confirmation</p>
        <h2 className="text-2xl font-bold text-green-600">92%</h2>
      </div>
    </div>
  )
}