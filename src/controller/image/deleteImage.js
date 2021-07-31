const { removeFile } = require("../../util/helpers/s3");
const { modelPicker } = require("../../util/helpers/model");

export const deleteImage = async (req, res) => {
  const key = req.params.key;
  const { userId, modelName } = req.body;

  const model = await modelPicker(userId, modelName);

  if (!model) return res.status(404).json({ message: "Model not found." });

  let result = removeFile(key);

  if (result === undefined)
    return res.status(403).json({ message: "Removing from S3 failed." });

  model.image = "";
  try {
    await model.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong with removing from DB." });
  }

  res.send(result);
};
