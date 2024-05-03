import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteWishlist, getWishlistById } from "../services/wishlist";
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
  const [formattedAddress, setFormattedAddress] = useState("");
  const { profile } = useContext(AppContext);

  const creationDate = formatDate(wishlist.creation_date);

  const navigate = useNavigate();

  useEffect(() => {
    getWishlistById(listId).then((res) => {
      setWishlist(res);
    });
  }, [listId]);

  useEffect(() => {
    if (wishlist.address) {
      const parts = wishlist.address.split(", ");
      let addressMarkup = (
        <div>
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
      );
      setFormattedAddress(addressMarkup);
    }
  }, [wishlist]);

  const handleDelete = () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this wishlist?"
    );

    // If user confirms, proceed with deletion
    if (confirmed) {
      deleteWishlist(wishlist.id)
        .then(() => {
          navigate("/myLists");
        })
        .catch((error) => {
          console.error("Error deleting wishlist:", error);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="pt-3">
          {profile.user?.id === wishlist.user?.id && (
            <>
              <Link to={`/wishlist/${wishlist.id}/editWishlist`}>
                <EditTooltip tooltipText={"Edit Wishlist"} />
              </Link>

              <DeleteTooltip
                tooltipText={"Delete Wishlist"}
                handleDelete={handleDelete}
              />
            </>
          )}
        </div>

        <div className="w-3/4">
          <h1>{wishlist.title}</h1>
          <h2>
            {wishlist.user?.first_name} {wishlist.user?.last_name}
          </h2>
          {eventDate && <h3>Event Date: {eventDate}</h3>}
          <p>{wishlist.description}</p>

          {wishlist.address && (
            <div>
              <p>Mailing Address</p>
              <div>{formattedAddress}</div>
            </div>
          )}
        </div>

        {profile.user?.id === wishlist.user?.id && (
          <div className="pt-5 text-left text-sm">
            <div className="border border-gray-500 bg-gray-200 px-5 py-5">
              <div>Created On: {creationDate}</div>
              <div>{wishlist.private ? "Private" : "Public"}</div>
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
            setWishlist={setWishlist}
          />
        ))
      ) : (
        <p>No items in wishlist. Add items or adjust your filter.</p>
      )}
    </div>
  );
};
