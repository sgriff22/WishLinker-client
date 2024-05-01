import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { FriendCardButton } from "./FriendCardButton";
import {
  acceptFriendRequest,
  getFilteredFriends,
  unfriend,
} from "../services/friends";
import { getCurrentUserProfile } from "../services/profile";

export const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { profile, setProfile } = useContext(AppContext);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Check if the query is empty
    if (query.trim() === "") {
      // If the query is empty, fetch all friends (original state)
      getCurrentUserProfile().then((res) => {
        setProfile(res);
      });
    } else {
      // If the query is not empty, fetch filtered friends
      getFilteredFriends(query).then((res) => {
        setProfile(res);
      });
    }
  };

  const handleUnfriend = (friendId) => {
    unfriend(friendId).then(() => {
      getCurrentUserProfile().then((res) => {
        setProfile(res);
      });
    });
  };

  const handleAccept = (requestId) => {
    acceptFriendRequest(requestId).then(() => {
      getCurrentUserProfile().then((res) => {
        setProfile(res);
      });
    });
  };

  return (
    <div>
      <h1>My Friends</h1>
      <div>
        <input
          name="search"
          type="text"
          value={searchQuery}
          placeholder="Search for item"
          onChange={handleInputChange}
          className="mb-5 mt-5 mr-5 text-lg p-1 rounded-lg border border-gray-400"
        />
        <button>Add New Friend</button>
        {profile.friends.map((f) => (
          <FriendCardButton
            key={f.friend_info.id}
            friend={f}
            buttonText={"Unfriend"}
            buttonHandler={() => handleUnfriend(f.id)}
          />
        ))}
      </div>
      <div>
        <h2>Friend Requests</h2>
        {profile.friend_requests.map((f) => (
          <FriendCardButton
            key={f.friend_info.id}
            friend={f}
            buttonText={"Accept"}
            buttonHandler={() => handleAccept(f.id)}
          />
        ))}
      </div>
    </div>
  );
};
