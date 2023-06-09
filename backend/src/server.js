const express = require("express");
const { Server: HttpServer } = require("http");
const cors = require("cors");
const {
  productsRouter,
  cartsRouter,
  authRouter,
  blogRouter,
} = require("./router/index.js");
const config = require("../config.js");

const app = express();
const httpServer = new HttpServer(app);

const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  config.FRONTEND_URL,
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

// Comentar la linea siguiente si se realizan peticiones a través de POSTMAN
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(`Something was wrong: ${err.message}`);
  }
});

const PORT = config.PORT;
httpServer.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
  );
});

module.exports = { httpServer };
