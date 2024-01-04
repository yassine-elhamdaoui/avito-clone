import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Products from "./pages/products/Products";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/sign_up/SignUp";
import ProductDetails from "./pages/Product_details/ProductDetails";
import AddProduct from "./pages/add_product/AddProduct";
import Settings from "./pages/settings/Settings";
import MyAdds from "./pages/my_adds/MyAdds";
import MyFavorites from "./pages/my_cart/MyCart";
import MainLayout from "./components/layouts/MainLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import NotFoundPage from "./pages/NotFoubdPage/NotFound";
import EditProduct from "./pages/EditProduct/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="cart" element={<MyFavorites />} />
            <Route path="my-favorites/:id" element={<ProductDetails />} />
            <Route path="my-adds" element={<MyAdds />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
