const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const passport = require("passport")
const session = require("express-session")
const initializePassport = require("./config/passport")
const cookiesParser = require("cookie-parser")
const MongoStore = require('connect-mongo');
const handlebars = require("express-handlebars");
const http = require("http");
const ViewRoutes = require("./routes/view.routes")
const AuthRoutes = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
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
app.use(cors())
const httpServer = http.createServer(app);
const socketServer = socketIO(httpServer);
//Invocar la funcion para conectar mongoose
connect()

app.use(session({
  store: MongoStore.create({
      mongoUrl:"mongodb+srv://danilolaura:resbalones123@clusterecommerce.0exvxqh.mongodb.net/ecommerce"
  }),
  secret:"danilosecreto",
  resave: true,
  saveUninitialized: true
}))

initializePassport()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", handlebars.engine());//------------- Falto engine
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views")

app.use(express.static(path.join(__dirname, "/public")));
app.use(cookiesParser("coderS3cr3t0"))
app.use("/api", indexRouter);

app.use("/", homeRouter);
app.use("/realtimeproducts", realTimeRouter);
app.use("/view", ViewRoutes)
app.use("/auth", AuthRoutes)
app.use("/user", userRouter)

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

app.get("/home",(req, res)=>{
  res.send({meASssage: "Entry pont", data: "Hola soy un HOME"})
})

dotenv.config({
  path:"./.env.dev"
})
console.log(process.env.PORT);
console.log(process.env.EMAIL);
console.log(process.env.CLIENTID_GITHUB);

httpServer.listen(PORT, () => {
  console.log(` Server listening on port: ${PORT}`);
});
