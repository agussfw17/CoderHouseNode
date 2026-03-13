import express from "express";
import http from "http";
import handlebars from "express-handlebars";
import "dotenv/config";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import Products from "./classes/productsClass.js";
import { connect } from "http2";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

/*Conexion a DB*/
const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://coder:coderpass@coderhouse-cluster.hej29ru.mongodb.net/coderhouse?appName=coderhouse-cluster");
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

connectMongoDB();

/*Configuracion de handlebars*/
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');
app.use('/static', express.static(__dirname + '/../public'));


/*Endpoints*/
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


/*WebSockets SS*/
io.on("connection", async (socket) => {
  console.log('Nuevo usuario on: ', socket.id);

  socket.on("addProduct", async (product) => {
    const newProduct = await Products.postProduct(product);
    io.emit("productAdded", newProduct);
  });

  socket.on("deleteProduct", async (id) => {
    await Products.deleteProduct(id);
    io.emit("productDeleted", id);
  });
});


const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});
