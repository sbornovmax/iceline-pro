import { getAdminRole } from '@/lib/admin-auth'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

export default async function AdminPage() {
  const role = await getAdminRole()
  return <AdminDashboardClient role={role ?? 'editor'} />
}
