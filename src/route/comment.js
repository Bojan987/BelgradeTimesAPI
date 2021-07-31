import express from "express";

import { authMiddleware, editMiddleware, isRoleMiddleware } from "../middlewares/";
import {
  getComments,
  getSingleComment,
  createComment,
  editComment,
  deleteComment,
  replyToComment,
  likes,
  dislikes,
  getPostComments,
  deleteAllForPost
} from "../controller/comment";

const router = express.Router();

router.get("/getComments", getComments);
router.get("/getSingleComment/:id", getSingleComment);
router.post("/createComment", authMiddleware, createComment);
router.put("/editComment", authMiddleware, editMiddleware, editComment);
router.delete("/deleteComment", authMiddleware, deleteComment);
router.put("/replyToComment", authMiddleware, replyToComment);
router.put("/likes", authMiddleware, likes);
router.put("/dislikes", authMiddleware, dislikes);
router.get("/getPostComments", getPostComments);
router.delete("/deleteForPost", authMiddleware, isRoleMiddleware(["admin"]), deleteAllForPost);

export default router;
