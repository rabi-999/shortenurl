const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const shortCode=shortid.generate();

exports.geturl= async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  }

exports.short =  async (req, res) => {
    const originalUrl = req.body.ourl;
      const shortBaseUrl="https://localhost:7000";//change according to url
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


