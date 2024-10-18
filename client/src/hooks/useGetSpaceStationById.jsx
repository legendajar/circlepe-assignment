import { setSingleSpaceStation } from '@/redux/spaceStationSlice';
import { SPACE_STATION_API_END_POINT } from '@/utils/URLS';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const useGetSpaceStationById = (id, refreshData) => {
  const dispatch = useDispatch();
  
  console.log(id, refreshData); // Check if valid values are passed
  
  useEffect(() => {
    console.log("UseEffect is running....")
    
    const fetchSpaceStationById = async () => {
        try {
            const res = await axios.get(`${SPACE_STATION_API_END_POINT}/get/${id}`, {withCredentials: true});

            if (res.data.success) {
              dispatch(setSingleSpaceStation(res.data.data));
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    fetchSpaceStationById();
  },  [id, refreshData, dispatch]); // Check if id and refreshData are changing
};

export default useGetSpaceStationById