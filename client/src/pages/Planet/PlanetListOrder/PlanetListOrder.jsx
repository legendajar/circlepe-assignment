import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import PlanetListOrderSection from './PlanetListOrderSection'

const PlanetListOrder = () => {
    return (
        <div>
            <Navbar />
            <div className='flex gap-5'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6'>
                    <PlanetListOrderSection />
                </div>
            </div>
    
        </div>
    )
}

export default PlanetListOrder