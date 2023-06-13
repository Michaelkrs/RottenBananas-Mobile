const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const User = require("../models/user-model");

class Controller {
  static async findAllUsers(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const userData = req.body;

      const newUser = await User.createUser(userData);

      res.status(201).json({
        id: newUser.insertedId,
        email: userData.email,
        username: userData.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const id = req.params.id;

      const user = await User.findById(id);

      if (!user) throw { name: "userNotFound" };

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;

      const user = await User.findById(id);

      if (!user) throw { name: "userNotFound" };

      await User.deleteUser(id);

      res.status(200).json({
        message: `User with id ${id} has been deleted`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
