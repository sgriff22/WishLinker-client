import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { apiUrl } from "../../utils";

export const UserCard = ({ user, buttonHandler }) => {
  const getFriendRequestStatus = (user) => {
    if (user.friend_request_sent) {
      return <p className="text-sm rose">Request Sent</p>;
    } else if (user.friend_request_received) {
      return <p className="text-sm rose">Request Received</p>;
    } else {
      return (
        <button className="p-2" onClick={buttonHandler}>
          Add Friend
        </button>
      );
    }
  };

  const friendRequestStatus = getFriendRequestStatus(user);

  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mx-auto flex items-center justify-between p-4 m-5 hover:border-2 hover:border-rose-300 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
      <Link to={`/profile/${user.id}`} className="flex items-center">
        {user.profile.image ? (
          <img
            className="w-16 h-16 object-contain object-center overflow-hidden mr-4"
            src={`${apiUrl}${user.profile?.image}`}
            alt={`Image of ${user.first_name} ${user.last_name}`}
          />
        ) : (
          <img
            className="w-16 h-auto object-cover object-center overflow-hidden mr-4"
            src="/public/media/images/Wish_logo.png"
            alt="Logo"
          />
        )}
        <div className="flex-grow">
          <h1 className="text-gray-900 font-semibold text-lg text-left">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600 text-left text-lg">{user.username}</p>
        </div>
      </Link>
      {friendRequestStatus}
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    friend_request_sent: PropTypes.bool,
    friend_request_received: PropTypes.bool,
    profile: PropTypes.shape({
      image: PropTypes.string,
    }),
  }),
  buttonHandler: PropTypes.func,
};
