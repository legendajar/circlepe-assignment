import { setSinglePlanet } from '@/redux/planetSlice'
import { PLANET_API_END_POINT } from '@/utils/URLS'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetPlanetById = (planetId) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchPlanetById = async () => {
        try {
            const res = await axios.get(`${PLANET_API_END_POINT}/get/${planetId}`, { withCredentials:true })
            if (res.data.success) {
                dispatch(setSinglePlanet(res.data.data))
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchPlanetById()
  }, [planetId, dispatch])
}

export default useGetPlanetById