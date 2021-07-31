require("dotenv").config();
import "babel-polyfill";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRoute from "./route/user.js";
import layoutRoute from "./route/layout.js";
import categoryRoute from "./route/category.js";
import postRoute from "./route/post.js";
import commentRoute from "./route/comment.js";
import forecastRoute from "./route/forecast.js";
import currencyRoute from "./route/currencyRates.js";
import statsRoute from "./route/stats.js";
import contactRoute from "./route/contactUs.js";
import imageRoute from "./route/image.js";

const { PORT, MONGODB_USER, MONGODB_PASS, ENV, MONGODB_SERVER } = process.env;

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public/static/images"));

app.use("/user", userRoute);
app.use("/layout", layoutRoute);
app.use("/category", categoryRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/forecast", forecastRoute);
app.use("/currencyRates", currencyRoute);
app.use("/images", imageRoute);
app.use("/", statsRoute);
app.use("/", contactRoute);

//  ERROD MIDDLEWARE
app.use(function (err, req, res, next) {
  res.status(500).json({ error: err.message });
});

const mongodbDev = `mongodb+srv://admin:Admin12345@cluster0.tqhwf.mongodb.net/portal`;
const mongodbProd = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@localhost:27017/news`;

mongoose
  .connect(ENV === "DEV" ? mongodbDev : mongodbProd, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`App is online on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("Error occured. Shuting down.");
    console.log("ERROR ", err);
    process.exit();
  });
