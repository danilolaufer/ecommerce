const express = require("express");
const handlebars = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const {indexRouter} = require("./routes/index.router");//-----------------corregir importacion ,Agregar {}
const path = require("path");
const{ realTimeRouter} = require("./routes/realTimeProducts.views");//----------corregir importacion,Agregar {}
const{ homeRouter} = require("./routes/home.views");//----------------------corregir importacion,Agregar {}
const {ProductManager} = require("./controllers/productManager");//----------corregir importacion,Agregar {}
const {connect} = require("./dao/db")//Importar la funcion connect para conectar mongoose
const productManager = new ProductManager("src/db/products.json");
const app = express();

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);
const socketServer = socketIO(httpServer);
//Invocar la funcion para conectar mongoose
connect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.engine("handlebars", handlebars.engine());//------------- Falto engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", indexRouter);

app.use("/", homeRouter);
app.use("/realtimeproducts", realTimeRouter);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("addProduct", async (data) => {
    const added = await productManager.addProduct(data);
    socketServer.emit("allProducts", await productManager.getProducts());
  });
});

app.get("*", (req, res) => {
  res.status(404).json({ status: "error", msg: "Path not found" });
});

httpServer.listen(PORT, () => {
  console.log(` Server listening on port: ${PORT}`);
});
