import express from "express";

import { contactUs } from "../controller/general/contactUs";
import { mailValidation } from "../validation";

import { validationMiddleware } from "../middlewares";

const router = express.Router();

router.post(
  "/contactUs",
  mailValidation.eMail,
  validationMiddleware,
  contactUs
);

export default router;
