import { useSelector } from 'react-redux'
import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import DashboardSection from './DashboardSection'
import useGetProductByPlanet from '@/hooks/useGetProductByPlanet'
import { useState } from 'react'
import useGetAllOrdersByMonth from '@/hooks/useGetAllOrdersByMonth'

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false)
  const planetID = useSelector((store) => store.planet.user?._id)
  console.log("PlanetId Received: ", planetID)
  useGetProductByPlanet(refresh, planetID)
  useGetAllOrdersByMonth(planetID)
  return (
    <div>
      <Navbar />
      <div className='flex gap-5'>
        <div className='w-1/6'>
          <Sidebar />
        </div>
        <div className='w-5/6'>
          <DashboardSection />
        </div>
      </div>
    </div>
  )
}

export default Dashboard