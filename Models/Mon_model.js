const mongoose = require("mongoose");

const urlMODEL = mongoose.model("urlMODEL", {
  ogUrl: {
    type: String,
    default: ""
  },
  shUrl: {
    type: String,
    default: ""
  },
  visit: {
    type: Number,
    default: 0
  }
});
module.exports = urlMODEL;
