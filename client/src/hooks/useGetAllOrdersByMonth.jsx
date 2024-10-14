import { setOrdersByMonth } from '@/redux/orderSlice';
import { ORDER_API_END_POINT } from '@/utils/URLS';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const useGetAllOrdersByMonth = (planetId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllOrdersByMonth = async () => {
        try {
            const res = await axios.get(`${ORDER_API_END_POINT}/get/month/${planetId}`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setOrdersByMonth(res.data.data))
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllOrdersByMonth();
  }, [planetId, dispatch])
}

export default useGetAllOrdersByMonth