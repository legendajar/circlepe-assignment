import { setTransactionList } from '@/redux/transactionSlice'
import { TRANSACTION_API_END_POINT } from '@/utils/URLS.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllTransaction = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllTransaction = async () => {
        try {
            const res = await axios.get(`${TRANSACTION_API_END_POINT}/get/all`, {withCredentials: true})
            if (res.data.success) {
                dispatch(setTransactionList(res.data.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllTransaction();
  }, [dispatch])
}

export default useGetAllTransaction