import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getWishlistById } from "../services/wishlist";
import { formatDate } from "../../utils";
import { ItemCard } from "./ItemCard";
import { FilterBar } from "./FilterBar";

export const WishlistDetails = () => {
  const [wishlist, setWishlist] = useState({});
  const { listId } = useParams();
  const eventDate = formatDate(wishlist.date_of_event);
  const parts = wishlist.address ? wishlist.address.split(", ") : [];

  useEffect(() => {
    getWishlistById(listId).then((res) => {
      setWishlist(res);
    });
  }, [listId]);

  return (
    <div>
      <h1>{wishlist.title}</h1>
      <h2>{wishlist.user?.first_name} {wishlist.user?.last_name}</h2>
      <h3>{eventDate}</h3>
      <p>{wishlist.description}</p>
      <p>Mailing Address</p>
      <p>{parts[0]}</p>
      <p>
        {parts[1]}, {parts[2]}
      </p>
      <FilterBar
        setWishlist={setWishlist}
        items={wishlist.items}
        id={wishlist.id}
      />
      {wishlist.wishlist_items && wishlist.wishlist_items.length > 0 ? (
        wishlist.wishlist_items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))
      ) : (
        <p>No items in wishlist. Add items or adjust your filter.</p>
      )}
    </div>
  );
};
