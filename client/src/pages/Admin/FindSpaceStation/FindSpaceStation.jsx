import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import FindSpaceStationSection from './FindSpaceStationSection'

const FindSpaceStation = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6 px-2 py-3'>
                <FindSpaceStationSection />
            </div>
        </div>
    </div>
  )
}

export default FindSpaceStation