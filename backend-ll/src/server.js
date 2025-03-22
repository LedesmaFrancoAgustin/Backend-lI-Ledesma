import express from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import path from 'path';
import { __dirname } from "./utils.js";
import expressHandlebars from 'express-handlebars';
import initializePassport from './passport/passport.config.js';
import passport from 'passport'; 
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import 'dotenv/config';

//import handlebars from "express-handlebars";
//import viewsLogin from "./routes/login.router.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initializePassport();
app.use(passport.initialize());

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 3600,
      }),
      secret: 'secretSession',
      resave: false,
      saveUninitialized: false,
    })
  );
  
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views')); 

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)

app.listen(PORT, () => {
    console.log(`Server ok en puerto ${PORT}`)
});
