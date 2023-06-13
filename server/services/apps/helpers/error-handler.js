const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = err.errors.map((el) => el.message).join();
      break;
    case "noInput":
      code = 400;
      msg = "Email/password required";
      break;
    case "genreNotFound":
      code = 400;
      msg = "Genre not found";
      break;
    case "loginFailed":
      code = 401;
      msg = "Email/password invalid";
      break;
    case "unauthorized":
      code = 401;
      msg = "Access token required";
      break;
    case "dataNotFound":
      code = 404;
      msg = "Data not found";
      break;
  }

  res.status(code).json({
    error: msg,
  });
};

module.exports = errorHandler;
