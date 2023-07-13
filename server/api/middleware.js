const { User } = require("../db");

// Defines and exports a middleware function. This middleware function checks if a user is logged in by trying to find a user associated with the token in the `Authorization` header of the request. If the user is found, it is assigned to `req.user` and the request is passed to the next middleware. If no user is found, the error is passed to the next middleware for error handling.

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
