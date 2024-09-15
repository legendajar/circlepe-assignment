import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v4 as uuid } from 'uuid'

const productImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Intergalatic-ecom/products',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: file.originalname
        }
    }
});

const productImageUploader = multer({ storage: productImageStorage }).single("file");

export default productImageUploader;