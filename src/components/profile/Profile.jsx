import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileByUserId } from "../services/profile";
import { WishlistCard } from "../wishlists/WishlistCard";
import { FriendCard } from "../friend/FriendCard";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    getProfileByUserId(userId).then((res) => {
      setProfile(res);
    });
  }, [userId]);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {profile.profile.image && (
        <div className="h-48 w-36 ml-2 mb-5">
          <img
            className="h-auto w-auto object-contain object-center overflow-hidden rounded-xl"
            src={profile.profile.image}
            alt={`Image of ${profile.user.first_name} ${profile.user.last_name}`}
          />
        </div>
      )}
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
