const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const dbConnection = mongoose.connection
dbConnection.on('open', () => {
    console.log('Connected to DB!')
})

const PersonSchema = {
    name: String
}

const Person = mongoose.model("Person", { name: String });

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
    const newPerson = new Person({
        name: req.body.name
    })
    newPerson.save()
    .then(doc => {
        return res
          .status(200)
          .send(doc);
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))