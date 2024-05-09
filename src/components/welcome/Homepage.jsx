/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { MiniCalendar } from "./MiniCalendar";
import { WishlistCard } from "../wishlists/WishlistCard";
import { updateWishlist } from "../services/wishlist";
import { getCurrentUserProfile } from "../services/profile";

export const Homepage = () => {
  const { profile, setProfile } = useContext(AppContext);

  const handleMyUnpin = (listId, list) => {
    const updatedWishlist = { ...list };
    updatedWishlist.pinned = false;

    updateWishlist(listId, updatedWishlist).then(() => {
      getCurrentUserProfile().then((res) => {
        setProfile(res);
      });
    });
  };

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center flex-wrap">
      <h1 className="text-6xl mb-5 w-full">
        Welcome {profile.user?.first_name}!
      </h1>
      <div className="w-11/12">
        <div className="w-full bg-gray-300 pt-2 pb-7 px-5 rounded-lg mb-5">
          <h2>Pinned Wishlists</h2>
          <div className="flex justify-center">
            <div className="w-2/3 bg-white mr-10 px-5 rounded-lg">
              <h3 className="rose">Mine</h3>
              {profile.my_pinned_lists.map((p) => (
                <div key={p.id}>
                  <div className="text-right">
                    <button
                      className="text-xs hover:text-xs"
                      onClick={() => {
                        handleMyUnpin(p.id, p);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <WishlistCard list={p} />
                </div>
              ))}
            </div>
            <div className="w-2/3 bg-white rounded-lg">
              <h3 className="rose">My Friends</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="bg-white rounded-lg mr-8 pt-2 pb-4 px-4 w-9/12">
            <h2>Your Friend's Newest Lists</h2>
          </div>
          <div className="flex flex-wrap justify-center bg-gray-200 w-80 pb-5 pt-2 px-2 rounded-xl shadow-md">
            <h2 className="w-full mb-2">Upcoming Events</h2>
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};
