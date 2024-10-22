import { setSingleSpaceStation } from '@/redux/spaceStationSlice';
import { SPACE_STATION_API_END_POINT } from '@/utils/URLS';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetSpaceStationById = (id, refreshData) => {
  const dispatch = useDispatch();

  // Check if valid values are passed
  console.log("ID:", id, "Refresh Trigger:", refreshData);

  useEffect(() => {
    // Early return if id is falsy
    if (!id) {
      console.log("No valid ID provided, skipping fetch...");
      return;
    }

    console.log("Fetching Space Station Data...");

    const fetchSpaceStationById = async () => {
      try {
        const res = await axios.get(`${SPACE_STATION_API_END_POINT}/get/${id}`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setSingleSpaceStation(res.data.data));
          console.log("Data fetched successfully:", res.data.data);
        } else {
          console.error("Failed to fetch data:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching Space Station data:", err.message);
      }
    };

    // Trigger fetch
    fetchSpaceStationById();
  }, [id, refreshData, dispatch]); // Dependency array to trigger on `id` or `refreshData` change
};

export default useGetSpaceStationById;
