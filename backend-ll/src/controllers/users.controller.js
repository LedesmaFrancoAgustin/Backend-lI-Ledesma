import { userService } from '../services/user.services.js';
import Controllers from './users.manager.js';
import UserResDTO from "../dtos/user.res.dto.js";



class UserController extends Controllers {
  constructor(){
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const userData = await this.service.login(req.body);
      req.session.user = userData;
  
      if (userData.role === 'admin') {
        return res.redirect('/api/products/admin');
      } else {
        return res.redirect('/api/products'); // O cualquier otra ruta para usuarios normales
      }
    } catch (error) {
      next(error);
    }
  };
  

}

export const userController = new UserController();
