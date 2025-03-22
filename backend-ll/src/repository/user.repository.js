import factory from "../daos/factory.js";
const { userDao } = factory;
import UserReqDTO from "../dtos/user.req.dto.js";
import UserResDTO from "../dtos/user.res.dto.js";

class UserRepository {
  constructor() {
    this.dao = userDao;
  }

  createUser = async (userData) => {
    try {
      const userDTO = new UserReqDTO(userData);
      return await this.dao.create(userDTO);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.dao.getById(id);
      return new UserResDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await this.dao.getByEmail(email);
      return user ? new UserResDTO(user) : null;
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllUsers = async () => {
    try {
      const users = await this.dao.getAll();
      return users.map((u) => new UserResDTO(u));
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userRepository = new UserRepository();
