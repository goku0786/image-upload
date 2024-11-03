const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express()

const imageRoute = require('./routes/image')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use((error, req, res, next) => {

    const message = error.message || 'server error'
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
        success: false,
        message: message
    })

})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/image', imageRoute)

const Port = process.env.PORT;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})