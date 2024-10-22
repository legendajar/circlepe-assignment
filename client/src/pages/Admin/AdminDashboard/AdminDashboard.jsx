import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import AdminDashboardSection from './AdminDashboardSection'

const AdminDashboard = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6'>
                <AdminDashboardSection />
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard