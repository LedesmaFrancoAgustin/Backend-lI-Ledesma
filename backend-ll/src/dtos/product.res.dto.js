export default class ProductResDTO {
    constructor(product) {
      this.title = product.title;
      this.price = product.price;
      this.stock = product.stock;
      this.description = product.description;
      this._id = product.id;
    }
  }
  