const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.JWT_PASS, (err, decodeToken) => {
    if (err) {
      res.status(401).json({ message: "unauthorized user" });
    } else {
      req.userId = decodeToken.id;
      next();
    }
  });
};

module.exports = verifyUser;
