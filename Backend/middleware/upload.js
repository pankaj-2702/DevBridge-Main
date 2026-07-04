const multer = require('multer');
const CloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('../db/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_photos',           // folder name in your Cloudinary account
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            { width: 500, height: 500, crop: 'fill' }  // auto resize
        ],
    },
});

// File filter — reject non-image files before upload
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },  // 2MB limit
});

module.exports = upload;