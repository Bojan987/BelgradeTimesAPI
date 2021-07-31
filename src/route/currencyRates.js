import express from "express";

import { getCurrencyRates } from "../controller/general/getCurrencyRates";

const router = express.Router();

router.get("/", getCurrencyRates);

export default router;
