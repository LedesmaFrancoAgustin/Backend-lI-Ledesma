import express from 'express';
import passport from 'passport';
import { authorize } from '../middlewares/auth.middleware.js';
import { cartController } from '../controllers/cart.controllers.js';

const router = express.Router();
/*
router.get('/viewCart', 
    passport.authenticate('current', { session: false }), 
    (req, res) => {
      res.render('cart'); 
    }
  );
*/
router.get(
    '/viewCart',
    passport.authenticate('current', { session: false }),
    authorize(['user']),
    cartController.getCartById
  );
// Ruta para agregar un producto al carrito
router.post(
  '/add/:productId',
  passport.authenticate('current', { session: false }),
  authorize(['user']),
  cartController.addProductToCart
);

router.post(
    '/:cid/purchase',
    passport.authenticate('current', { session: false }),
    authorize(['user']),
    cartController.purchaseCart
  );

// (Opcional) Ruta para ver el carrito del usuario
router.get(
  '/',
  passport.authenticate('current', { session: false }),
  authorize(['user']),
  cartController.getCart
);


router.post(
    '/empty',
    passport.authenticate('current', { session: false }),
    authorize(['user']),
    cartController.emptyCart
  );

  
  

export default router;
