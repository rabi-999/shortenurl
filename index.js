// Require express module
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const express = require("express");
const PORT = 7000;
require('./models/UrlShorten');
const app = express();
var path = require('path');
const mongoURI = "mongodb://dude:dude1by2@ds253831.mlab.com:53831/mongofirstpro"
var bodyParser = require('body-parser');
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('/client'));
mongoose.connect(mongoURI);
var urlroutes = require("./routes/urlroutes");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const shortCode=shortid.generate();
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'client','index.html'));
});
app.post("/api/item", urlroutes.short);
app.get("/:code", urlroutes.geturl);
/*app.post("/api/item", async (req, res) => {
    const originalUrl = req.body.ourl;
      
      const shortBaseUrl="https://onebytwo.in"
     if (validUrl.isUri(shortBaseUrl)) {
         
         
    } else 
    {
      return res.status(404).json("Invalid Base Url format");
    }
    const urlCode = shortCode;
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } 
        else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
        }
      } 
    catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res.status(401).json("Invalid Original Url.");
    }
  }
    );*/
//app.use('/', router);
//Start server on Port 7000

app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});