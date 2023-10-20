const express = require("express");
const mongoose = require("mongoose")
const handlebars = require("express-handlebars");

const cookiesParser = require("cookie-parser")


//pasasport imports:
const passport = require("passport")
const initializePassport = require("./config/passport.config")
const config = require("./config/config")
const MongoSingleton = require("./config/mongodb-singleton")
const {addLoger} = require("./config/logger")

//routers:
const studentRouter  = require('./routes/students.router.js')
const coursesRouter  = require('./routes/courses.router.js')
const viewsRouter = require("./routes/views.router")
const usersViewRouter = require("./routes/user.view.router")
const jwtRouter = require("./routes/jwt.router")
const productRouter  = require('./routes/products.router')
const cartRouter  = require('./routes/carts.routes')
const sessionRouter = require("./routes/sessions.router")
const express = require('express');
const userRouter = require('./routes/userRouter');

app.use('/api/users', userRouter);



const dotenv = require("dotenv")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const http = require("http");
const compression = require("express-compression")
const emailRouter = require("./routes/email.router")
const smsRouter = require("./routes/sms.router")
const userRouter = require("./routes/user.routes")
const socketIO = require("socket.io");
const {indexRouter} = require("./routes/index.router");//-----------------corregir importacion ,Agregar {}
const path = require("path");
const{ realTimeRouter} = require("./routes/realTimeProducts.views");//----------corregir importacion,Agregar {}
const{ homeRouter} = require("./routes/home.views");//----------------------corregir importacion,Agregar {}
const {ProductManager} = require("./controllers/productManager");//----------corregir importacion,Agregar {}
const {connect} = require("./dao/managerMongo/db")//Importar la funcion connect para conectar mongoose
const productManager = new ProductManager("src/db/products.json");
const { devLogger, prodLogger } = require('./config/logger');
const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors())
const httpServer = http.createServer(app);
const socketServer = socketIO(httpServer);
connect()
initializePassport()

//swaggger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');

const swaggerOptions = {
	definition:{
		openapi:"3.0.1",
		info:{
			title:"hola" ,
			description:"swagger"
		}
	},
	apis:[`${__dirname}./src/docs/doc.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUIExpress.serve ,swaggerUIExpress.setup(specs))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", handlebars.engine());//------------- Falto engine
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views")
app.use(express.static(path.join(__dirname, "/public")));

app.use(cookiesParser("CoderS3cr3tC0d3"))

//routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", sessionRouter)

app.use("/api", indexRouter);
app.use("/", homeRouter);
app.use("/realtimeproducts", realTimeRouter);
app.use("/user", userRouter)
app.use('/', viewsRouter);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);
app.use("/users", usersViewRouter);
app.use("/api/jwt", jwtRouter);
//nodemailer
app.use("/api/email", emailRouter)
//twilio
app.use("/api/sms", smsRouter)

app.get('/loggerTest', (req, res) => {
  devLogger.debug('Mensaje de depuración');
  devLogger.http('Mensaje de registro HTTP');
  devLogger.info('Mensaje informativo');
  devLogger.warning('Mensaje de advertencia');
  devLogger.error('Mensaje de error');
  devLogger.fatal('Mensaje fatal');
  
  prodLogger.debug('Mensaje de depuración en producción');
  prodLogger.http('Mensaje de registro HTTP en producción');
  prodLogger.info('Mensaje informativo en producción');
  prodLogger.warning('Mensaje de advertencia en producción');
  prodLogger.error('Mensaje de error en producción');
  prodLogger.fatal('Mensaje fatal en producción');
  
  res.send('Registros de prueba realizados.');
});
//GZIP
app.use(compression())


const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance();
  } catch (error) {
      console.error(error);
      process.exit();
  }
};
mongoInstance();
