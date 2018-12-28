const express = require('express')
const app = express()
const port = 3000

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}


app.use(loggerMiddleware)
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.post('/hello', (req, res) => {
    return res.status(200).send({
        message: `Hello ${req.body.name}`
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))