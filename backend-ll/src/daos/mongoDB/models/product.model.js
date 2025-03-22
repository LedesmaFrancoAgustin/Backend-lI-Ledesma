import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String
});

const Product = mongoose.model('Product', productSchema);
export default Product;
