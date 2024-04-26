import { useEffect, useState } from "react";
import { getWishlists } from "../services/wishlist";
import { WishlistCard } from "./WishlistCard";

export const MyLists = () => {
  const [publicWishlists, setPublicWishlists] = useState([]);
  const [privateWishlists, setPrivateWishlists] = useState([]);

  useEffect(() => {
    getWishlists().then((res) => {
      // Filter wishlists based on public/private
      const publicWishlistsData = res.filter((wishlist) => !wishlist.private);
      const privateWishlistsData = res.filter((wishlist) => wishlist.private);

      setPublicWishlists(publicWishlistsData);
      setPrivateWishlists(privateWishlistsData);
    });
  }, []);

  return (
    <div>
      <div>My Wishlists</div>
      <div>
        <h2>
          Private{" "}
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
        </h2>
        {privateWishlists.map((list) => (
          <WishlistCard key={list.id} list={list} />
        ))}
      </div>
      <div>
        <h2>
          Public{" "}
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
        </h2>
        {publicWishlists.map((list) => (
          <WishlistCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};
