const express = require("express");
const app = express();
const port = 5000;
const shortid = require("shortid");

// require mongoose to connect nodejs and mongodb
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/test",
  { useNewUrlParser: true }
);
const dbConnection = mongoose.connection;
dbConnection.on("open", () => {
  console.log("Connected to DB!");
});

// schema of the url
const URL = mongoose.model("url", {
  hash: String,
  url: String,
  maxHits: { type: Number },
  hits: { type: Number, default: 0 }
});

// middlewares to connect the request and url
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// used the middlewares in the app
app.use(loggerMiddleware);
// the data should be contain in json
app.use(express.json());

// this is the default home route which wil send only 'hello world'
app.get("/", (req, res) => {
  return res.send("Hello World");
});

// this is the shorten endpoint(/shorten) where we will send the url to generate a hash
// if the url is exist already so it will not short the url otherwise if the url is
// new than it will generate new hash url
app.post("/shorten", (req, res) => {
  console.log(req.body);
  URL.findOne({ url: req.body.url,maxHits: req.body.maxHits})
    .exec()
    .then(existingUrl => {
      
      if (existingUrl) {
        if(existingUrl.maxHits) {
          const hash = shortid.generate();
          return URL.create({ hash: hash, url: req.body.url, maxHits: req.body.maxHits });
        } else {
          return existingUrl
        }
      } else {
          const hash = shortid.generate();
          return URL.create({ hash: hash, url: req.body.url });
      }
    })
    .then(doc => {
      return res.status(201).send(doc);
    });
});

// created hit endpoint(/hits)
// it will query the hits and then it will give the result of the number of times
// we used the hash url url
app.get("/hits", (req, res) => {
  console.log("***", req.query.hash);
  URL.findOne({ hash: req.query.hash })
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        return res.status(201).send({ hits: result.hits });
      } else {
        return res.status(404);
      }
    });
});

// hash endpoint(/:hash)
// here we will the pass the hash url as a parameter it will check if the url is existing
// than it will redirect to url and also update the hits otherwise it will throw an error of (404) not found

app.get("/:hash", (req, res) => {
  console.log("&&&", req.params);
  URL.findOne({ hash: req.params.hash })
    .exec()

    .then(existingUrl => {
      console.log(existingUrl);
      if (existingUrl) {
        console.log("Redirecting...");
        return URL.update(
          { hash: req.params.hash },
          { $set: { hits: existingUrl.hits + 1 } }
        )
          .exec()

          .then(() => {

            console.log(existingUrl);
            console.log(existingUrl.maxHits);
            // limitations of using the hash url
            if (existingUrl.maxHits){
              if (existingUrl.hits < existingUrl.maxHits) {
                return res.redirect(existingUrl.url);
              } else {
                return res.sendStatus(404);
              }
            }else{
              return res.redirect(existingUrl.url);
            } 
          });
      } else {
        return res.send(404);
      }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
