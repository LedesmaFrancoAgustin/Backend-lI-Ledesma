import { initMongoDB } from "../db/connection-mongo.js";

// DAOs importados desde la carpeta de MongoDB
import CartDaoMongoDB from "./mongoDB/cart.dao.js";;
import UserDaoMongoDB from "./mongoDB/user.dao.js";
import ProductDaoMongoDB from "./mongoDB/product.dao.js";

const persistence = process.env.PERSISTENCE || "mongo";

switch (persistence) {
  case "mongo":
    initMongoDB()
      .then(() => console.log("✅ MongoDB conectado"))
      .catch((error) => console.error("❌ Error conectando MongoDB:", error));
    break;
  default:
    console.log(`Persistence mode "${persistence}" no reconocido.`);
    break;
}

const factory = {
  cartDao: new CartDaoMongoDB(),
  prodDao: new ProductDaoMongoDB(),
  userDao: new UserDaoMongoDB(),
};

export default factory;
