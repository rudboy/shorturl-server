const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());

const urlMODEL = require("../Models/Mon_model");

makeid = length => {
  var Newurl = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    Newurl += possible.charAt(Math.floor(Math.random() * possible.length));

  return Newurl;
};

router.get("/creat_url", async (req, res) => {
  let newUrl = makeid(5);
  try {
    const newList = new urlMODEL({
      ogUrl: req.query.url,
      shUrl: "https://shorturl-server.herokuapp.com/" + newUrl,
      visit: 0
    });
    await newList.save();
    res.json({ message: "Created okay" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/all_url", async (req, res) => {
  try {
    const all_key = await urlMODEL.find({}.key);
    const alllist = await urlMODEL.find();
    res.json(all_key);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/found_url", async (req, res) => {
  try {
    const find_one = await urlMODEL.findOne({ shUrl: req.query.url });
    find_one.visit = find_one.visit + 1;
    find_one.save();
    res.json(find_one.ogUrl);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/:id", async (req, res) => {
  let url = "https://shorturl-server.herokuapp.com/" + req.params.id;
  try {
    const find_one = await urlMODEL.findOne({ shUrl: url });
    find_one.visit = find_one.visit + 1;
    find_one.save();
    res.redirect(find_one.ogUrl);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/delete", async (req, res) => {
  try {
    const deleteproduct = await urlMODEL.findById({ _id: req.query.id });
    await deleteproduct.remove();
    res.json("Delete okay");
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
module.exports = router;
