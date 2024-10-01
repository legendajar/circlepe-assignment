import { setPlanetOrderList } from '@/redux/planetSlice';
import { ORDER_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const useGetAllPlanetOrder = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPlanetOrder = async () => {
            try {
                console.log(id)
                const res = await axios.get(`${ORDER_API_END_POINT}/get/planet/${id}`, {withCredentials: true})
                if (res.data.success) {
                    dispatch(setPlanetOrderList(res.data.data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllPlanetOrder();
    }, [id, dispatch])
}

export default useGetAllPlanetOrder