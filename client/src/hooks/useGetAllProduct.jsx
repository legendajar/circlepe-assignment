import { setProductList } from '@/redux/productSlice';
import { PRODUCT_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAllProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllProduct = async() => {
        try {
            const res = await axios.get(`${PRODUCT_API_END_POINT}/get/all`, {withCredentials: true})
            if (res.data.success) {
                dispatch(setProductList(res.data.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllProduct();
  }, [dispatch])
}

export default useGetAllProduct