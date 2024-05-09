import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteWishlist,
  getWishlistById,
  updateWishlist,
} from "../services/wishlist";
import { formatDate } from "../../utils";
import { ItemCard } from "./ItemCard";
import { FilterBar } from "./FilterBar";
import AppContext from "../../context/AppContext";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";
import { PinTooltip } from "../tooltips/PinTooltip";
import { getCurrentUserProfile } from "../services/profile";

export const WishlistDetails = () => {
  const [wishlist, setWishlist] = useState({});
  const { listId } = useParams();
  const eventDate = formatDate(wishlist.date_of_event);
  const [formattedAddress, setFormattedAddress] = useState("");
  const { profile, setProfile } = useContext(AppContext);

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

  const handlePin = () => {
    const updatedWishlist = { ...wishlist };
    updatedWishlist.pinned = true;

    updateWishlist(listId, updatedWishlist).then(() => {
      getWishlistById(listId).then((res) => {
        setWishlist(res);
        window.alert("Pinned to homepage");
        getCurrentUserProfile().then((res) => {
          setProfile(res);
        });
      });
    });
  };

  return (
    <div className="mx-40">
      <div className="flex justify-start">
        <div className="flex justify-start w-1/4 pt-3 -mt-3">
          {profile.user?.id === wishlist.user?.id && (
            <>
              <Link to={`/wishlist/${wishlist.id}/editWishlist`}>
                <EditTooltip tooltipText={"Edit Wishlist"} />
              </Link>

              {!wishlist.pinned && (
                <PinTooltip
                  tooltipText={"Pin to Homepage"}
                  handlePin={handlePin}
                />
              )}

              <DeleteTooltip
                tooltipText={"Delete Wishlist"}
                handleDelete={handleDelete}
              />
            </>
          )}
        </div>

        <div className="w-2/3 bg-white rounded-lg shadow-md p-6 mr-1">
          <h2 className="rose -mb2">{wishlist.title}</h2>
          <h2 className="text-2xl">
            {wishlist.user?.first_name} {wishlist.user?.last_name}
          </h2>
          {eventDate && (
            <h3 className="text-lg mt-1">Event Date: {eventDate}</h3>
          )}
          <p className="text-lg mt-2">{wishlist.description}</p>

          {wishlist.address && (
            <div className="mt-4">
              <p className="text-base font-semibold">Mailing Address</p>
              <div className="text-sm">{formattedAddress}</div>
            </div>
          )}
        </div>

        <div className="w-1/4 pt-4 text-left text-sm -mt-4">
          {profile.user?.id === wishlist.user?.id && (
            <div className="ml-auto w-48 bg-white px-5 py-4 rounded-lg shadow-md">
              <p className="font-bold">
                Created: <span className="font-light">{creationDate}</span>
              </p>
              <p className="font-bold">
                Visibility:{" "}
                <span className="font-light">
                  {wishlist.private ? "Private" : "Public"}
                </span>
              </p>
              <p className="font-bold">
                Spoil Surprises:{" "}
                <span className="font-light">
                  {wishlist.spoil_surprises ? "Yes" : "No"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="item-left mt-5">
        <FilterBar
          setWishlist={setWishlist}
          id={wishlist.id}
          listUserId={wishlist.user?.id}
          currentUserId={profile.user?.id}
        />
      </div>
      <section className="text-gray-600">
        <div className="mx-auto">
          <div className="flex flex-wrap justify-center">
            {wishlist.wishlist_items && wishlist.wishlist_items.length > 0 ? (
              wishlist.wishlist_items.map((item) => (
                <div key={item.id} className=" md:w-1/3">
                  <ItemCard
                    item={item}
                    listUserId={wishlist.user?.id}
                    currentUserId={profile.user?.id}
                    currentUserFriends={profile?.friends}
                    setWishlist={setWishlist}
                    spoilValue={wishlist.spoil_surprises}
                  />
                </div>
              ))
            ) : (
              <p className="m-auto mt-5">
                No items in wishlist. Add items or adjust your filter.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
