const { Server: IOServer } = require("socket.io");
const { httpServer } = require("./server");

const io = new IOServer(httpServer);

io.on("connection", async (socket) => {
  const productsService = ProductsServices;
  const messagesService = MessagesServices;

  const allProducts = await productsService.getProducts();
  const allMessages = await messagesService.getMessages();

  socket.emit("show-all-products", allProducts);
  socket.emit("show-all-messages", allMessages);

  socket.on("add-product", async (product) => {
    console.log("producto cargado");
    await productsService.saveProductService(product);
    const newProducts = await productsService.getProducts();
    io.sockets.emit("show-all-products", newProducts);
  });

  socket.on("add-message", async (message) => {
    console.log("mensaje recibido");

    await messagesService.saveMessageService(message);
    const newMessages = await messagesService.getMessages();

    io.sockets.emit("show-all-messages", newMessages);
  });
});
