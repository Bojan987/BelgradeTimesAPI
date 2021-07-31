import mongoose from "mongoose";
require("dotenv").config();

//  models
import User from "../model/user";
import Category from "../model/category";
import Post from "../model/post";
import Comment from "../model/comment";
import Layout from "../model/layout";

// data
import {
  generateUsers,
  generatePosts,
  generateCategories,
  generateComments,
  generateLayouts
} from "./data";

const { MONGODB_USER, MONGODB_PASS, ENV } = process.env;
const mongodbDev = `mongodb+srv://admin:Admin12345@cluster0.tqhwf.mongodb.net/portal`;
const mongodbProd = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@localhost:27017/news`;

mongoose
  .connect(ENV === "DEV" ? mongodbDev : mongodbProd, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const createData = async () => {
      //  CREATE USERS
      const createUsers = async () => {
        await User.deleteMany();
        const users = generateUsers();

        await User.insertMany([...users]);

        console.log("Users created!");
      };

      const createLayouts = async () => {
        await Layout.deleteMany();
        const admins = await User.find({
          role: "admin",
          emailConfirmed: true
        }).select("_id");

        const layouts = generateLayouts(admins);
        await Layout.insertMany([...layouts]);

        console.log("Layouts created!");
      };

      //  CREATE CATEGORIES
      const createCategories = async () => {
        await Category.deleteMany();
        const admins = await User.find({
          role: "admin",
          emailConfirmed: true
        }).select("_id");

        const layouts = await Layout.find();
        const categories = generateCategories(admins, layouts);
        await Category.insertMany(categories);

        console.log("Categories created!");
      };

      //  CREATE POSTS
      const createPosts = async () => {
        await Post.deleteMany();
        const journalist = await User.find({
          role: "journalist",
          emailConfirmed: true
        }).select("_id");
        const categories = await Category.find().select("_id");

        const posts = generatePosts(categories, journalist);
        await Post.insertMany([...posts]);

        console.log("Posts created!");
      };

      //  CREATE COMMENTS
      const createComments = async () => {
        await Comment.deleteMany();
        const visitors = await User.find({
          role: "visitor",
          emailConfirmed: true
        }).select("_id");

        const posts = await Post.find().select("_id");

        const comments = generateComments(posts, visitors);
        await Comment.insertMany([...comments]);

        console.log("Comments created!");
      };

      await createUsers();
      await createLayouts();
      await createCategories();
      await createPosts();
      await createComments();
    };

    createData()
      .then(() => process.exit())
      .catch(err => {
        console.log(err);
        process.exit();
      });
  })
  .catch(err => {
    console.log("MONGODB: Error occured. Shuting down.");
    console.log("ERROR ", err);
    process.exit();
  });
