import express from 'express';
import passport from 'passport';
import { authorize } from '../middlewares/auth.middleware.js';
import { productController } from "../controllers/product.controller.js";

const router = express.Router();

// Ruta para renderizar el formulario de agregar productos (solo admin)
router.get('/admin', 
    passport.authenticate('current', { session: false }), 
    authorize(['admin']), 
    (req, res) => {
      res.render('admin'); // Asegurate que el archivo addProduct.handlebars esté en views/
    }
  );

router.post('/:id', productController.getProdById);
//router.post('/cart/:cid/products/:pid', productController);

export default router