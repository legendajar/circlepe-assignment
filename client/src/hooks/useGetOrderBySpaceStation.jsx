import { setOrderListSpaceStation } from '@/redux/orderSlice';
import { ORDER_API_END_POINT } from '@/utils/URLS';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetOrderBySpaceStation = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrderByPlanet = async () => {
        try {
            const res = await axios.get(`${ORDER_API_END_POINT}/get/${id}`,{withCredentials: true})
            if (res.data.success) {
              dispatch(setOrderListSpaceStation(res.data.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchOrderByPlanet ();
  }, [id,dispatch])
}

export default useGetOrderBySpaceStation