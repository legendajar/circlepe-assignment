import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import UpdateProductSection from './UpdateProductSection'

const UpdateProduct = () => {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6 m-5'>
                    <UpdateProductSection />
                </div>
            </div>
    
        </div>
    )
}

export default UpdateProduct