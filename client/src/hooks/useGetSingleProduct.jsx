import { setSingleProduct } from '@/redux/productSlice';
import { PRODUCT_API_END_POINT } from '@/utils/URLS';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleProduct = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleProduct = async () => {
        try {
            const res = await axios.get(`${PRODUCT_API_END_POINT}/get/${id}`, {withCredentials: true})
            if (res.data.success) {
                dispatch(setSingleProduct(res.data.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchSingleProduct();
  }, [id, dispatch])
}

export default useGetSingleProduct