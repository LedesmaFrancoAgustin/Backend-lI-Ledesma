import express from 'express';
import passport from 'passport';
import {userController} from "../controllers/users.controller.js"
import {authorize} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', userController.login);



router.post('/register', userController.register);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/:id', userController.delete);

export default router;
