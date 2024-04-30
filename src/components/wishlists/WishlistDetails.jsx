import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWishlistById } from "../services/wishlist";
import { formatDate } from "../../utils";
import { ItemCard } from "./ItemCard";
import { FilterBar } from "./FilterBar";
import AppContext from "../../context/AppContext";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";

export const WishlistDetails = () => {
  const [wishlist, setWishlist] = useState({});
  const { listId } = useParams();
  const eventDate = formatDate(wishlist.date_of_event);
  const parts = wishlist.address ? wishlist.address.split(", ") : [];
  const { profile } = useContext(AppContext);

  useEffect(() => {
    getWishlistById(listId).then((res) => {
      setWishlist(res);
    });
  }, [listId]);

  return (
    <div>
      <h1>
        {profile.user?.id === wishlist.user?.id && (
          <>
            <Link>
              <EditTooltip tooltipText={"Edit Wishlist"} />
            </Link>

            <DeleteTooltip tooltipText={"Delete Wishlist"} />
          </>
        )}
        {wishlist.title}
      </h1>
      <h2>
        {wishlist.user?.first_name} {wishlist.user?.last_name}
      </h2>
      <h3>{eventDate}</h3>
      <p>{wishlist.description}</p>
      <p>Mailing Address</p>
      <p>{parts[0]}</p>
      <p>
        {parts[1]}, {parts[2]}
      </p>
      <FilterBar
        setWishlist={setWishlist}
        id={wishlist.id}
        listUserId={wishlist.user?.id}
        currentUserId={profile.user?.id}
      />
      {wishlist.wishlist_items && wishlist.wishlist_items.length > 0 ? (
        wishlist.wishlist_items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            listUserId={wishlist.user?.id}
            currentUserId={profile.user?.id}
            currentUserFriends={profile?.friends}
          />
        ))
      ) : (
        <p>No items in wishlist. Add items or adjust your filter.</p>
      )}
    </div>
  );
};
