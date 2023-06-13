const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    const hashedPassword = hashPassword(user.password);

    return this.getCollections().insertOne({
      email: user.email,
      username: user.username,
      password: hashedPassword,
      role: "admin",
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteUser(id) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = User;
