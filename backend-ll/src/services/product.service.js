import Services from "./service.manager.js";
import { prodDao } from "../daos/mongoDB/product.dao.js"
import factory from "../daos/factory.js";

import { prodRepository } from "../repository/product.repository.js";

class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    getProdById = async (id) => {
        try {
            return await prodRepository.getProdById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    getAll  = async () => {
      try {
          return await prodRepository.getAll();
      } catch (error) {
          throw new Error(error);
      }
  };

    createProduct = async (productData) => {
        const { title, description, price, stock, category, image } = productData;
    
        if (!title || !description || !price || !stock || !category) {
          throw new Error('Todos los campos son obligatorios.');
        }
    
        try {
          const newProduct = await prodDao.create({
            title,
            description,
            price,
            stock,
            category,
            image
          });
          return newProduct;
        } catch (error) {
          throw new Error(`Error al crear producto: ${error.message}`);
        }
      };
}

export const prodService = new ProductService();