import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import PlanetProfilePageSection from './PlanetProfilePageSection'


const PlanetProfilePage = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='w-1/6'>
                <Sidebar />
            </div>
            <div className='w-5/6 px-2 py-3'>
                <PlanetProfilePageSection />
            </div>
        </div>
    </div>
  )
}

export default PlanetProfilePage