const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

exports.connectCloudinary = () => {
    try {
        const info = cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        })
        console.log("connected to the cloudinary successfully");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Uploads a profile image to Cloudinary.
 *
 * @param {Object} image - The image object containing the buffer data.
 * @param {string} folder - The folder where the image will be stored in Cloudinary.
 * @param {string} [public_id=null] - The public ID for the image. If not provided, a unique ID will be generated.
 * @returns {Promise<Object>} - A promise that resolves to the Cloudinary response object containing the uploaded image details.
 * @throws Will log an error message to the console if an error occurs during the upload process.
 */
exports.uploadToCloudinary = async (image, folder, public_id = null, resourceType = 'image') => {
    try {
        // Convert buffer to a readable stream
        const stream = Readable.from(image.buffer);
        const uploadOptions = {
            resource_type: resourceType,
            folder,
            overwrite: true,
        };

        if (public_id) {
            uploadOptions.public_id = public_id.split('/').pop();
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.pipe(streamLoad);
        });

        return cloudinaryResponse;
    } catch (error) {
        console.log({ 'Error while uploading image': error });
    }
}

// Generate the optimized URL with transformations
exports.generateOptimizedUrl = (public_id, version) => {
    const optimizedUrl = cloudinary.url(public_id, {
        fetch_format: 'auto',
        quality: 'auto',
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
        secure: true,
        version
    });
    return optimizedUrl;
}

exports.deleteFromCloudinary = async (public_id) => {
    try {
        await cloudinary.api.delete_resources_by_prefix(public_id, function (error, result) {
            console.log({ result, error });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.checkIsResourceAvailableOnCloudinary = async (public_id) => {
    try {
        await cloudinary.api.resource(`polling/profile_images/${public_id}`, function (error, result) {
            if (error) {
                console.log('Image not found, it has been deleted.');
            } else {
                console.log('Image still exists:', result);
            }
        });
    } catch (error) {
        console.log(error);
    }
}