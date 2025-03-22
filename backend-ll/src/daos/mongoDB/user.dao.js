import MongoDao from "../mongoDB/mongo.dao.js";
import UserModel from "../mongoDB/models/user.model.js";
//UserDaoMongoDB
export default class UserDaoMongo extends MongoDao {
  constructor() {
    super(UserModel)
  }

  async register(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("cart");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userDao = new UserDaoMongo();
