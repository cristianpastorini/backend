/* import express from 'express';
import { ProductManager } from './services/productManager.js';
import { CartManager } from './services/cartManager.js';
import { productsRouter } from './routes/products.router.js';
import {cartsRouter} from './routes/carts.router.js';

const PORT = 8080;
const app = express();

export const productManager  = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.listen(PORT, (req, res) => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
}); */

import express from 'express'
import { ProductManager } from './services/productManager.js';
import { CartManager } from './services/cartManager.js'
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import serverSocket from "./config/socket.config.js";
import router from './routes/realTimeProducts.router.js';
//import { updateProductsList } from "./config/socket.config.js"

const app = express();
const PORT = 8080;
const HOST = "localhost";


export const productManager  = new ProductManager;
export const cartManager = new CartManager;

//Preparar la configuración del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));


const serverHTTP = app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto: ${PORT}`);
});

serverSocket.config(serverHTTP);