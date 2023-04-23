const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send(`Something was wrong: ${err.message}`);
  }
};

module.exports = errorHandler;
