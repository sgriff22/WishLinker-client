import { Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";
import { Welcome } from "../welcome/Welcome.jsx";
import { MyLists } from "../wishlists/MyLists.jsx";
import { WishlistDetails } from "../wishlists/WishlistDetails.jsx";
import { NewWishlist } from "../forms/NewWishlist.jsx";
import { MyProfile } from "../profile/MyProfile.jsx";
import { Profile } from "../profile/Profile.jsx";
import { FriendsList } from "../friend/FriendsList.jsx";
import { SearchFriend } from "../friend/SearchFriend.jsx";
import { EditWishlist } from "../forms/EditWishlist.jsx";
import { NewItem } from "../forms/NewItem.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Welcome />} />
        <Route path="myLists" element={<MyLists />} />
        <Route path="wishlist">
          <Route path=":listId">
            <Route index element={<WishlistDetails />} />
            <Route path="editWishlist" element={<EditWishlist />} />
            <Route path="newItem" element={<NewItem />} />
          </Route>
          <Route path="newWishlist" element={<NewWishlist />} />
        </Route>
        <Route path="profile">
          <Route index element={<MyProfile />} />
          <Route path=":userId" element={<Profile />} />
        </Route>
        <Route path="friends" element={<FriendsList />} />
        <Route path="findFriend" element={<SearchFriend />} />
      </Route>
    </Routes>
  );
};
