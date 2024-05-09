import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { WishlistCard } from "../wishlists/WishlistCard";
import { FriendCard } from "../friend/FriendCard";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";

export const MyProfile = () => {
  const { profile } = useContext(AppContext);
  const [formattedAddress, setFormattedAddress] = useState("");

  const formattedDate = formatDate(profile.profile?.birthday);

  const navigate = useNavigate();

  useEffect(() => {
    if (profile.profile?.address) {
      const parts = profile.profile.address.split(", ");
      let addressMarkup = (
        <>
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
        </>
      );
      setFormattedAddress(addressMarkup);
    }
  }, [profile]);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5 ml-24 -mr-32">
      <div className="col-span-1">
        <div className="grid grid-cols-3 gap-5">
          {profile.profile.image && (
            <div className="h-48 w-36 ml-2 mb-5">
              <img
                className="h-auto w-auto object-contain object-center overflow-hidden rounded-xl"
                src={profile.profile.image}
                alt={`Image of ${profile.user.first_name} ${profile.user.last_name}`}
              />
            </div>
          )}

          <div className="col-span-3">
            <div className="grid grid-cols-4 mb-4">
              <div className="col-span-2">
                <h1 className="text-left ml-2 text-6xl">
                  {profile.user.first_name} {profile.user.last_name}
                </h1>
                <h2 className="text-left ml-2 text-xl mt-2">
                  {profile.user.username}
                </h2>
              </div>

              <div className="flex justify-end col-span-2 ml-2">
                <div className="form-button text-white flex rounded-lg pl-1 pr-2 py-2">
                  <div className="ml-2">
                    <p className="text-lg font-semibold">Birthday</p>
                    <p className="text-sm">{formattedDate}</p>
                  </div>
                  <div className="ml-8">
                    <p className="text-lg font-semibold">Mailing Address</p>
                    <div className="text-sm">{formattedAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg px-3 py-2 mb-6 text-left bg-white shadow-sm">
              <h3>Bio</h3>
              <p className="text-lg">{profile.profile.bio}</p>
            </div>

            <div className="m-2 bg-gray-400 pt-2 px-10 pb-10 rounded-lg">
              <h2 className="mb-2 text-black">My Wishlists</h2>
              {profile.wishlists.map((w) => {
                return <WishlistCard key={w.id} list={w} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 ml-5">
        <div className="flex flex-col justify-top w-2/3">
          <div className="text-right mb-5 mr-2">
            <button
              onClick={() => {
                navigate("/profile/editProfile");
              }}
            >
              Edit Profile
            </button>
          </div>
          <div className="m-2 bg-gray-300 pt-2 px-10 pb-10 rounded-lg">
            <h2 className="mb-1 rose">My Friends</h2>
            {profile.friends.map((f) => {
              return (
                <Link
                  key={f.friend_info.id}
                  to={`/profile/${f.friend_info.id}`}
                >
                  <FriendCard friend={f.friend_info} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
