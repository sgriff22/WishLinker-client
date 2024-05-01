import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FriendCardButton } from "./FriendCardButton";

export const FriendsList = () => {
  const { profile } = useContext(AppContext);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  const handleUnfriend = () => {
    console.log("unfriend");
  };

  const handleAccept = () => {
    console.log("accept");
  };

  return (
    <div>
      <h1>My Friends</h1>
      <div>
        {profile.friends.map((f) => (
          <FriendCardButton
            key={f.friend_info.id}
            friend={f}
            buttonText={"Unfriend"}
            buttonHandler={handleUnfriend}
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
            buttonHandler={handleAccept}
          />
        ))}
      </div>
    </div>
  );
};
