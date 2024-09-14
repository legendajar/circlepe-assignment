import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import ListTransactionSection from './ListTransactionSection'

const ListTransaction = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6 px-2 py-3'>
                <ListTransactionSection />
            </div>
        </div>
    </div>
  )
}

export default ListTransaction