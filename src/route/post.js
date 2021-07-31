import express from "express";

import {
  createPost,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
  getMainPost,
  getPrimaryPosts,
  canBeMain,
  canBePrimary,
  getPostsBySearch,
  getCatPosts,
  getJournalistPosts,
  isPostLight
} from "../controller/post";

import {
  authMiddleware,
  isRoleMiddleware,
  editMiddleware
} from "../middlewares";

import { uploadImage } from "../util/helpers";

const router = express.Router();
const upload = uploadImage("/posts");

router.post(
  "/createPost",
  upload.single("post"),
  authMiddleware,
  isRoleMiddleware(["admin", "journalist"]),
  upload.single("post"),
  editMiddleware,
  createPost
);

router.put("/editPost/:postId", authMiddleware, editMiddleware, editPost);
router.delete("/deletePost", authMiddleware, deletePost);
router.get("/getPosts", getPosts);
router.get("/getSinglePost", getSinglePost);
router.get("/getMainPost", getMainPost);
router.get("/getPrimaryPosts/:categoryId", getPrimaryPosts);
router.get("/canBeMain", canBeMain);
router.get("/canBePrimary/:idCategory", canBePrimary);
router.get("/journalistPosts", getJournalistPosts);
router.get("/getPostsBySearch", getPostsBySearch);
router.get("/getCatPosts", getCatPosts);
router.get("/isPostLight/:idPost", isPostLight);

export default router;
