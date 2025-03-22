import { createHash } from "../utils.js";
import Services from "./service.manager.js";
import { userDao } from "../daos/mongoDB/user.dao.js";
import factory from "../daos/factory.js";
import { cartService } from "../services/cart.services.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Admin } from "mongodb";

class UserService extends Services {
  constructor() {
    super(userDao);
  }

  async register({ first_name, last_name, email, age, password }) {
    const existingUser = await this.dao.getByEmail(email); 
    if (existingUser) {
      throw new Error('El email ya está registrado.');
    }
    // Si quieres crear un carrito automáticamente cuando se registra un usuario:

    const hashedPassword = createHash(password);
    const cart = await cartService.createCart(); 

    const newUser = await this.dao.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      cart: cart._id,
    });

    return newUser;
  }

  async login({ email, password }) {
    const user = await this.dao.getByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) throw new Error('Contraseña incorrecta');

    // Creamos el token sin incluir info sensible
    const payload = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      role: user.role
    };

    //const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return payload;
  }
  
}

export const userService = new UserService();
