const { uploadFile } = require("../../util/helpers/s3");

const fs = require("fs");
const util = require("util");

const unlinkFile = util.promisify(fs.unlink);

export const uploadImage = async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(403).json({ message: "No file provided." });
  }

  if (file.size > 1000000) {
    try {
      await unlinkFile(file.path);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong with removing file from filesystem",
      });
    }
    return res.status(403).json({ message: "Image must be lesser than 1MB" });
  }

  let result;
  try {
    result = await uploadFile(file);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong with uploading to S3" });
  }

  try {
    await unlinkFile(file.path);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong with removing file from filesystem",
    });
  }
  res.send({ imageKey: result.Key });
};
