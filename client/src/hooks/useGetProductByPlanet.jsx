import { setPlanetProductList } from '@/redux/productSlice';
import { PRODUCT_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetProductByPlanet = (refresh, id) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProductByPlanet = async () => {
        try {
            const res = await axios.get(`${PRODUCT_API_END_POINT}/get/planet/${id}`, {withCredentials: true})
            if (res.data.success) {
                dispatch(setPlanetProductList(res.data.data))
            }
        } catch (err) {
            console.log(err)
        }
    } 
    fetchProductByPlanet();
  }, [refresh, id, dispatch])
}

export default useGetProductByPlanet