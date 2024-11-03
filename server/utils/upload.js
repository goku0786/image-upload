const cloudinary = require('./cloudinaryConfig')
const streamifier = require('streamifier')

const upload = async (file) => {
    // try {
    //     const response = await cloudinary.uploader.upload(file, {
    //         upload_preset: 'chat-app'
    //     })
    //     return response
    // } catch (error) {
    //     console.log(error)
    // }

    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {
                folder: 'files',
                // resource_type: 'auto'
                transformation: {
                    width: 500,
                    height: 500,
                    crop: 'limit'
                }

            }
            , (error, result) => {
                if (error) return reject(error)
                resolve(result)

            })

        streamifier.createReadStream(file.buffer).pipe(stream)

    })
}

module.exports = upload