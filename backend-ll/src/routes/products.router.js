import express from 'express';
import passport from 'passport';
import { authorize } from '../middlewares/auth.middleware.js';
import { productController } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/admin', 
    passport.authenticate('current', { session: false }), 
    authorize(['admin']), 
    (req, res) => {
      res.render('admin'); 
    }
  );

router.post('/addProduct', productController.createProduct);
router.post('/:id', productController.getProdById);

export default router