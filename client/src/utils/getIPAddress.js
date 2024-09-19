import axios from "axios"

const getIpAddress = async() => {
    try {
        const ipData = await axios.get('https://api.ipify.org?format=json')
        const ipAddress = ipData.data.ip
        return ipAddress
    } catch (err) {
        console.log(err)
    }
}

export default getIpAddress