import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { WishlistCard } from "../wishlists/WishlistCard";
import { FriendCard } from "../friend/FriendCard";
import { Link } from "react-router-dom";

export const MyProfile = () => {
  const { profile } = useContext(AppContext);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <h1 className="col-span-3 text-left -mb-3 ml-2 text-6xl mt-32">
        {profile.user.first_name} {profile.user.last_name}
      </h1>
      <h2 className="col-span-3 text-left ml-2">{profile.user.username}</h2>
      <div className="col-span-2">
        <div className="m-2 bg-gray-400 pt-2 px-10 pb-10">
          <h2 className="mb-2">My Wishlists</h2>
          {profile.wishlists.map((w) => {
            return <WishlistCard key={w.id} list={w} />;
          })}
        </div>
      </div>
      <div>
        <div className="m-2 bg-gray-300 pt-2 px-10 pb-10 -mt-40">
          <h2 className="mb-1">My Friends</h2>
          {profile.friends.map((f) => {
            return (
              <Link key={f.friend_info.id} to={`/profile/${f.friend_info.id}`}>
                <FriendCard friend={f.friend_info} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
