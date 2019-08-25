const getTokenFromheader = (req, res, next) => {
  const header = req.headers.authorization;
  const bearer = header.split(' ');
  const token = bearer[1];

  req.token = token;
  next();
};

module.exports = getTokenFromheader;
