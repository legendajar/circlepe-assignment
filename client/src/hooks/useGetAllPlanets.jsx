import { setPlanetList } from '@/redux/planetSlice';
import { PLANET_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const useGetAllPlanets = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPlanets = async () => {
            try {
                const res = await axios.get(`${PLANET_API_END_POINT}/all`, {withCredentials: true})
                if (res.data.success) {
                    dispatch(setPlanetList(res.data.data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllPlanets();
    }, [dispatch])
}

export default useGetAllPlanets