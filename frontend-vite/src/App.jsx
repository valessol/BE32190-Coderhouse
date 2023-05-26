import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmAccount from "./pages/ConfirmAccount";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import Layout from "./layout/Layout";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductsDetail";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Cart from "./pages/Cart";
import "./index.css";
import ProductsProvider from "./context/ProductsContext";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Store />} />
                <Route path="login" element={<Login />} />
                <Route path="registrar" element={<Register />} />
                <Route path="confirmar/:id" element={<ConfirmAccount />} />
                <Route path="tienda/:id" element={<ProductDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<Post />} />
              </Route>
              <Route path="/carrito" element={<ProtectedRoutes />}>
                <Route index element={<Cart />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
