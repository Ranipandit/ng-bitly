const express = require('express')
const app = express()
const port = 3000
const shortid = require('shortid')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const dbConnection = mongoose.connection
dbConnection.on('open', () => {
    console.log('Connected to DB!')
})

const URL = mongoose.model("url", {
    hash: String,
    url: String,
    hits: { type: Number, default: 0 }
});

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}


app.use(loggerMiddleware)
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.post('/shorten', (req, res) => {
    URL.findOne({url: req.body.url}).exec()
    .then(existingUrl => {
       if (existingUrl) {
            return existingUrl;
       } else {
            const hash = shortid.generate();
            return URL.create({ hash: hash, url: req.body.url });
       }
    }).then(doc => {
        return res.status(201).send(doc)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))