import axios from "axios";

const getLocationByIp = async (ip) => {
    try{
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        return res
    } catch (err) {
        console.log("Error fetching location: ", err);
    }
}


export default getLocationByIp