const express = require("express");
const { Server: HttpServer } = require("http");
const cors = require("cors");
const {
  productsRouter,
  cartsRouter,
  authRouter,
} = require("./router/index.js");
const blogRouter = require("./router/blog.js");
const config = require("../config.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));

const httpServer = new HttpServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/blog", blogRouter);
app.use("/api/cart", cartsRouter);

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
