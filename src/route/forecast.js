import express from "express";

import { getWeather } from "../controller/general/getForecast";

const router = express.Router();

router.get("/", getWeather);

export default router;
