export const editMiddleware = (req, res, next) => {
  const data = req.body;

  const checkData = data => {
    for (let item in data) {
      if (data[item] === "") {
        delete data[item];
      }
    }

    return data;
  };

  const newData = checkData(data);
  req.body = { ...newData };

  next();
};
