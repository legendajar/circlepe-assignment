import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const spaceStationProfileImageStorage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Intergalatic-ecom/space-stations',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: file.originalname
        }
    }
});

const spaceStationProfileImageUploader = multer({ storage: spaceStationProfileImageStorage }).single("file");

export default spaceStationProfileImageUploader;