const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 9000).toString();
}

export default generateOTP