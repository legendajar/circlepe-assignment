import { setOrderList } from '@/redux/orderSlice';
import { ORDER_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllOrder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await axios.get(`${ORDER_API_END_POINT}/get/all`, {withCredentials: true})
                if (res.data.success) {
                    dispatch(setOrderList(res.data.data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllOrders();
    }, [dispatch])
}

export default useGetAllOrder