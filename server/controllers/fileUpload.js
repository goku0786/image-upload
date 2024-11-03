const upload = require('../utils/upload')


const fileUpload = async (req, res, next) => {
    const result = await upload(req.file)

    console.log(result)

    if (!req.file) {
        const error = new Error('Please upload a file');
        error.statusCode = 400
        throw error
    }

    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        image: result?.secure_url
    })
}

module.exports = fileUpload