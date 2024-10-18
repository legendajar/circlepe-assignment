
import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import OrderDetailPageSection from './OrderDetailPageSection'

const OrderDetailPage = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6 mt-16'>
                <OrderDetailPageSection />
            </div>
        </div>

    </div>
  )
}

export default OrderDetailPage