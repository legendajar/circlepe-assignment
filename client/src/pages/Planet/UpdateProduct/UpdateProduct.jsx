import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import UpdateProductSection from './UpdateProductSection'

const UpdateProduct = () => {
    return (
        <div>
            <Navbar />
            <div className='flex gap-5'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6'>
                    <UpdateProductSection />
                </div>
            </div>
    
        </div>
    )
}

export default UpdateProduct