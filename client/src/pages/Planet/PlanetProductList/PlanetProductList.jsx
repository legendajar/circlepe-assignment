import React from 'react'
import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import PlanetProductListSection from './PlanetProductListSection'

const PlanetProductList = () => {
    return (
        <div>
            <Navbar />
            <div className='flex gap-5'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6'>
                    <PlanetProductListSection />
                </div>
            </div>
    
        </div>
    )
}

export default PlanetProductList