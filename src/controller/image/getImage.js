const { getFile } = require("../../util/helpers/s3");

export const getImage = (req, res) => {
  const key = req.params.key;
  const readStream = getFile(key);

  readStream.pipe(res);
};
