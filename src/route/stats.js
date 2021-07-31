import express from "express";

import { getStats } from "../controller/general/getStats";

const router = express.Router();

router.get("/stats", getStats);

export default router;
