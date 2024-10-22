import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import AddWarehouseSection from './AddWarehouseSection'

const AddWarehouse = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6'>
                <AddWarehouseSection />
            </div>
        </div>
    </div>
  )
}

export default AddWarehouse