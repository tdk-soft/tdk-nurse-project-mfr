import AppointmentTable from './components/AppointmentTable'
import AdminStats from './components/AdminStats'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <AdminStats />
      <AppointmentTable />
    </div>
  )
}