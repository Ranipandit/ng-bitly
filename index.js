const express = require('express')
const app = express()
const port = 5000
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
    return res.send('Hello World')
})

app.post('/shorten', (req, res) => {
    console.log(req.body)
    URL.findOne({url: req.body.url}).exec()
        .then(existingUrl => {
            if (existingUrl) {
                    return existingUrl;
            } else {
                    const hash = shortid.generate();
                    return URL.create({ hash: hash, url: req.body.url });
            }
        })
        .then(doc => {
            return res.status(201).send(doc)
        })
})

app.get('/hits',(req, res) => {
    console.log('***', req.query.hash);
    URL.findOne({hash: req.query.hash}).exec()
        .then(result => {
            if(result) {
                console.log(result)
                return res.status(201).send({ hits: result.hits })
            } else {
                return res.status(404)
            }
        })

})

app.get('/:hash', (req, res) => {
    console.log('&&&', req.params);
    URL.findOne({hash: req.params.hash}).exec()
        .then(existingUrl => {
            console.log(existingUrl)
            if (existingUrl) {
                console.log("Redirecting...")
                return URL.update({hash: req.params.hash},{$set:{hits: existingUrl.hits+1}}).exec()
                            .then(() => {
                                console.log(existingUrl)
                                return res.redirect(existingUrl.url);
                            })
            } else {
                return res.sendStatus(404)
            }
        })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))