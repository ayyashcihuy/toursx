class usersController {
  static getAllUsers(req, res, next) {
    res.status(500).json({
      status: "error",
      message: "route not defined",
    });
  }
  static getSingleUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "route not defined",
    });
  };
  static createUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "route not defined",
    });
  };
  static updateUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "route not defined",
    });
  };
  static deleteUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "route not defined",
    });
  };
}

module.exports = usersController;
