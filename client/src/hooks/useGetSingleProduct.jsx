import { setSingleProduct } from '@/redux/productSlice';
import { PRODUCT_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetSingleProduct = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) {
      alert('Please provide a valid product ID');
      return;
    }
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API_END_POINT}/get/${id}`, { withCredentials: true });
        
        if (res.data.success) {
          dispatch(setSingleProduct(res.data.data));
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.log('Error fetching product:', err);
      }
    };
    
    fetchSingleProduct();
  }, [id, dispatch]);
};

export default useGetSingleProduct;
