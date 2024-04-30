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

  const formatedDate = formatDate(wishlist.creation_date);

  useEffect(() => {
    getWishlistById(listId).then((res) => {
      setWishlist(res);
    });
  }, [listId]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="pt-3">
          {profile.user?.id === wishlist.user?.id && (
            <>
              <Link>
                <EditTooltip tooltipText={"Edit Wishlist"} />
              </Link>

              <DeleteTooltip tooltipText={"Delete Wishlist"} />
            </>
          )}
        </div>

        <div className="w-3/4">
          <h1>{wishlist.title}</h1>
          <h2>
            {wishlist.user?.first_name} {wishlist.user?.last_name}
          </h2>
          <h3>{eventDate}</h3>
          <p>{wishlist.description}</p>
          <p>Mailing Address</p>
          <p>{parts[0]}</p>
          {parts.length > 3 ? (
            <>
              <p>{parts[1]}</p>
              <p>
                {parts[2]}, {parts[3]}
              </p>
            </>
          ) : (
            <p>
              {parts[1]}, {parts[2]}
            </p>
          )}
        </div>

        {profile.user?.id === wishlist.user?.id && (
          <div className="pt-5 text-left text-sm">
            <div className="border border-gray-500 bg-gray-200 px-5 py-5">
              <div>Created On: {formatedDate}</div>
              <div>Private: {wishlist.private ? "Yes" : "No"}</div>
              <div>
                Spoil Surprises: {wishlist.spoil_surprises ? "Yes" : "No"}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="item-left">
        <FilterBar
          setWishlist={setWishlist}
          id={wishlist.id}
          listUserId={wishlist.user?.id}
          currentUserId={profile.user?.id}
        />
      </div>
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
