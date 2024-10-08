import { setSingleOrder } from '@/redux/orderSlice';
import { ORDER_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetSingleOrder = (id) => {
  const dispatch = useDispatch();
  console.log("Order ID Received: ", id)
  useEffect(() => {
    console.log("useEffect triggered with ID:", id);
    if (!id) {
      alert('Invalid Order');
    }
    const fetchSingleProduct = async () => {
        try {
            const res = await axios.get(`${ORDER_API_END_POINT}/get/order/${id}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setSingleOrder(res.data.data));
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err)
            alert('Please contact Integalatic Store');
        }
    };
    fetchSingleProduct();
  }, [id, dispatch]);
};

export default useGetSingleOrder;
