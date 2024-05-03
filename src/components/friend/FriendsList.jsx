import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { FriendCardButton } from "./FriendCardButton";
import {
  acceptFriendRequest,
  getFilteredFriends,
  unfriend,
} from "../services/friends";
import { getCurrentUserProfile } from "../services/profile";
import { useNavigate } from "react-router-dom";

export const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { profile, setProfile } = useContext(AppContext);

  const navigate = useNavigate();

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

  const handleUnfriend = (friendId, friendFirstName, friendLastName) => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to unfriend ${friendFirstName} ${friendLastName}?`
    );

    if (confirmed) {
      unfriend(friendId).then(() => {
        getCurrentUserProfile().then((res) => {
          setProfile(res);
          alert(
            `You ${friendFirstName} ${friendLastName} are no longer friends.`
          );
        });
      });
    }
  };

  const handleAccept = (requestId, friendFirstName, friendLastName) => {
    acceptFriendRequest(requestId).then(() => {
      getCurrentUserProfile().then((res) => {
        setProfile(res);
        alert(`You ${friendFirstName} ${friendLastName} are now friends.`);
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
        <button
          onClick={() => {
            navigate("/findFriend");
          }}
        >
          Add New Friend
        </button>
        {profile.friends.map((f) => (
          <FriendCardButton
            key={f.friend_info.id}
            friend={f}
            buttonText={"Unfriend"}
            buttonHandler={() =>
              handleUnfriend(
                f.id,
                f.friend_info.first_name,
                f.friend_info.last_name
              )
            }
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
            buttonHandler={() =>
              handleAccept(
                f.id,
                f.friend_info.first_name,
                f.friend_info.last_name
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
