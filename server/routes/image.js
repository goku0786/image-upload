const express = require('express')
const fileUpload = require('../controllers/fileUpload')
const multerFile = require('../middlewares/multerFile')

const router = express.Router()

router.post('/upload', multerFile, fileUpload)

module.exports = router