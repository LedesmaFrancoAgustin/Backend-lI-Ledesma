import { prodService } from "../services/product.service.js";
import Controllers from "./product.manager.js";
import { authorize } from '../middlewares/auth.middleware.js';
import passport from 'passport';

class ProductController extends Controllers {
  constructor() {
    super(prodService);
  }

  getProdById = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.service.getProdById(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.service.getAll(); // Usando el service
      res.render('products', { products });
    } catch (error) {
      next(error);
    }
  };

  createProduct = [
    passport.authenticate('current', { session: false }),
    authorize(['admin']),
    async (req, res) => {
      try {
        const newProduct = await this.service.createProduct(req.body);
        res.status(201).json({
          message: 'Producto creado correctamente por administrador.',
          product: newProduct
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  ];

  updateProduct = [
    passport.authenticate('current', { session: false }),
    authorize(['admin']),
    (req, res) => {
      // Lógica de actualización
      res.json({ message: 'Producto actualizado por administrador.' });
    }
  ];

  deleteProduct = [
    passport.authenticate('current', { session: false }),
    authorize(['admin']),
    (req, res) => {
      // Lógica de borrado
      res.json({ message: 'Producto eliminado por administrador.' });
    }
  ];

  addProductToCart = [
    passport.authenticate('current', { session: false }),
    authorize(['user']),
    (req, res) => {
      // Lógica para agregar producto al carrito
      res.json({ message: 'Producto agregado al carrito correctamente.' });
    }
  ];
}

export const productController = new ProductController();
