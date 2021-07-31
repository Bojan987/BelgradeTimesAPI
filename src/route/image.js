const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getImage,
  deleteImage,
} = require("../controller/image/index");

const Router = express.Router();
const upload = multer({ dest: "uploads/" });

Router.get("/:key", getImage);

Router.post("/uploadImage", upload.single("image"), uploadImage);

Router.post("/:key", deleteImage);

export default Router;
