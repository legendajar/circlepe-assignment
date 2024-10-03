import { setSpaceStationList } from '@/redux/spaceStationSlice';
import { SPACE_STATION_API_END_POINT } from '@/utils/URLS.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllSpaceStation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllSpaceStations = async () => {
      try {
        const res = await axios.get(`${SPACE_STATION_API_END_POINT}/get/all`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSpaceStationList(res.data.data));
        } else {
          console.error('Failed to fetch space stations:', res.data.message);
        }
      } catch (err) {
        console.error('Error fetching space stations:', err);
      }
    };

    fetchAllSpaceStations();
  }, [dispatch]);
};

export default useGetAllSpaceStation;
