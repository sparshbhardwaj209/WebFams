const authAdmin = (req, res, next) => {
  const token = "xyz";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(401).send("Unauthorized access!!!");
  } else {
    next();
  }
};

const authUser = (req, res, next) => {
  const token = "xyz";
  const isUser = token === "xyz";
  if (!isUser) {
    res.status(401).send("Unauthorized access!!!");
  } else {
    next();
  }
};


module.exports = {
    authAdmin,
    authUser
}