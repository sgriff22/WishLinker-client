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
      <h1 className="mb-4">My Friends</h1>
      <div className="flex justify-center">
        <div className="w-96 mt-4 mr-10">
          <input
            name="search"
            type="text"
            value={searchQuery}
            placeholder="Search for item"
            onChange={handleInputChange}
            className="mr-5 text-lg px-2 pt-1 border rounded-md shadow-sm mb-3"
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
        <div className="w-96 pt-4 -mt-1">
          <div className="bg-gray-200 shadow-sm rounded-2xl p-4">
            <h2 className="-mt-2 rose">Friend Requests</h2>
            {profile.received_requests.map((f) => (
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
      </div>
    </div>
  );
};
