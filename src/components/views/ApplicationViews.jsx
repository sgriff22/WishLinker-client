import { Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";
import { Welcome } from "../welcome/Welcome.jsx";
import { MyLists } from "../wishlists/MyLists.jsx";
import { WishlistDetails } from "../wishlists/WishlistDetails.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Welcome />} />
        <Route path="myLists" element={<MyLists />} />
        <Route path="wishlist">
          <Route path=":listId" element={<WishlistDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
