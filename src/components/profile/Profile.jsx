import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentUserProfile, getProfileByUserId } from "../services/profile";
import { WishlistCard } from "../wishlists/WishlistCard";
import { FriendCard } from "../friend/FriendCard";
import { formatDate } from "../../utils";
import AppContext from "../../context/AppContext";
import { addFriend } from "../services/friends";

export const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { userId } = useParams();
  const [formattedAddress, setFormattedAddress] = useState("");
  const formattedDate = formatDate(userProfile.profile?.birthday);
  const [friend, setFriend] = useState(false);
  const [request, setRequest] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);

  const { profile, setProfile } = useContext(AppContext);

  useEffect(() => {
    getProfileByUserId(userId).then((res) => {
      setUserProfile(res);
    });
  }, [userId]);

  useEffect(() => {
    if (userProfile.profile?.address) {
      const parts = userProfile.profile.address.split(", ");
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
  }, [userProfile]);

  //Use effect to see if user is a friend
  useEffect(() => {
    if (profile && profile?.friends && profile.friends.length !== 0) {
      const filter = profile.friends.some(
        (f) => f.friend_info?.id == userProfile.user?.id
      );
      setFriend(filter);
    }
  }, [profile, userProfile]);

  //Use effect to see if user is already sent friend request
  useEffect(() => {
    if (
      profile &&
      profile?.sent_requests &&
      profile.sent_requests.length !== 0
    ) {
      const filter = profile.sent_requests.some(
        (f) => f.friend_info?.id == userProfile.user?.id
      );
      setRequest(filter);
    }
  }, [profile, userProfile]);

  //Use effect to see if user is already received a friend request
  useEffect(() => {
    if (
      profile &&
      profile?.received_requests &&
      profile.received_requests.length !== 0
    ) {
      const filter = profile.received_requests.some(
        (f) => f.friend_info?.id == userProfile.user?.id
      );
      setReceivedRequest(filter);
    }
  }, [profile, userProfile]);

  const handleAddFriend = () => {
    addFriend(userId).then(() => {
      getProfileByUserId(userId).then((res) => {
        setUserProfile(res);
        getCurrentUserProfile().then((res) => {
          setProfile(res);
        });
      });
    });
  };

  if (!userProfile || !userProfile.user || !profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5 ml-24 -mr-32">
      <div className="col-span-1">
        <div className="grid grid-cols-3 gap-5">
          {userProfile.profile.image && (
            <div className="h-48 w-36 ml-2 mb-5">
              <img
                className="h-auto w-auto object-contain object-center overflow-hidden rounded-xl"
                src={userProfile.profile.image}
                alt={`Image of ${userProfile.user.first_name} ${userProfile.user.last_name}`}
              />
            </div>
          )}

          <div className="col-span-3">
            <div className="grid grid-cols-4 mb-4">
              <div className="col-span-2">
                <h1 className="text-left ml-2 text-6xl">
                  {userProfile.user.first_name} {userProfile.user.last_name}
                </h1>
                <h2 className="text-left ml-2 text-xl mt-2">
                  {userProfile.user.username}
                </h2>
              </div>

              {(userProfile.user.id === profile.user.id || friend) && (
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
              )}
            </div>

            {(userProfile.user.id === profile.user.id || friend) && (
              <div className="rounded-lg px-3 py-2 mb-6 text-left bg-white shadow-sm">
                <h3>Bio</h3>
                <p className="text-lg">{userProfile.profile.bio}</p>
              </div>
            )}

            <div className="m-2 bg-gray-400 pt-2 px-10 pb-10 rounded-lg">
              <h2 className="mb-2 text-black">My Wishlists</h2>
              {userProfile.wishlists.map((w) => {
                return <WishlistCard key={w.id} list={w} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 ml-5">
        <div className="flex flex-col justify-top w-2/3">
          {userProfile.user.id !== profile.user.id &&
            !friend &&
            !request &&
            !receivedRequest && (
              <div className="text-right mb-5 mr-2">
                <button onClick={handleAddFriend}>Add Friend</button>
              </div>
            )}
          <div className="m-2 bg-gray-300 pt-2 px-10 pb-10 rounded-lg">
            <h2 className="mb-1 rose">My Friends</h2>
            {userProfile.friends.map((f) => {
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
