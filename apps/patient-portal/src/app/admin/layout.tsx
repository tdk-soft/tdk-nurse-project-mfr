export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b p-4 shadow-sm">
        <h1 className="text-xl font-bold text-sky-600">
          MFR Admin Dashboard
        </h1>
      </header>

      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  )
}