import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetOrderByPlanet = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrderByPlanet = async () => {
        try {
            const res = await axios.get
        } catch (err) {
            console.log(err)
        }
    }
    fetchOrderByPlanet ();
  }, [id,dispatch])
}

export default useGetOrderByPlanet