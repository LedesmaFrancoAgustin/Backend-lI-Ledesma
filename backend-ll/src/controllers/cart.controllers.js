import { cartService } from '../services/cart.services.js';
import Product from '../daos/mongoDB/models/product.model.js';
import Ticket from '../daos/mongoDB/models/ticket.model.js';


class CartController {
    
    getCartById = async (req, res) => {
        try {
          const cartId = req.user.cart;
         if (!cartId) {
          return res.status(404).json({ message: 'Este usuario no tiene un carrito asignado.' });
          }
          const cart = await cartService.getCartById(cartId);
          
          res.render('cart', { cart });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
    
  addProductToCart = async (req, res) => {
    try {
      const userId = req.user.cart;
      const { productId } = req.params;
      await cartService.addProdToCart(userId, productId);
      res.json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getCart = async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await cartService.getCart(userId);
      res.render('cart', { cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const cartId = req.user.cart;
      await cartService.clearCart(cartId);
      res.json({ message: 'Carrito vaciado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 
  purchaseCart = async (req, res) => {
    try {
      const cartId = req.user.cart;
      const cart = await cartService.getCartById(cartId);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });
  
      let totalAmount = 0;
      const productsToPurchase = [];
  
      // Corroborar stock y actualizar productos
      for (const item of cart.products) {
        const product = await Product.findById(item.product._id);
        if (product.stock >= item.quantity) {
          // Restar stock
          product.stock -= item.quantity;
          await product.save();
  
          // Sumar al total
          totalAmount += product.price * item.quantity;
          productsToPurchase.push(item);
        } else {
          console.log(`Sin stock suficiente para: ${product.title}`);
        }
      }
  
      if (productsToPurchase.length === 0) {
        return res.status(400).json({ message: 'No se pudo procesar la compra. No hay stock suficiente de ningún producto.' });
      }
  
      // Generar ticket
      const ticket = await Ticket.create({
        amount: totalAmount,
        purchaser: req.user.email,
      });
  
      // Vaciar carrito
      await cartService.clearCart(cartId);
  
      // Mostrar el ticket generado
      res.render('ticket', { ticket: ticket.toObject() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la compra.' });
    }
  };
  
  
}

export const cartController = new CartController();
