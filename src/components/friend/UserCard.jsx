import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const UserCard = ({ user, buttonHandler }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mx-auto flex items-center justify-between p-4 m-5">
      <Link to={`/profile/${user.id}`} className="flex items-center">
        <img
          className="w-16 h-full object-cover object-center mr-4"
          src="/public/media/images/Wish_logo.png"
          alt="Friend Image"
        />
        <div className="flex-grow">
          <h1 className="text-gray-900 font-semibold text-lg text-left">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600 text-left text-lg">{user.username}</p>
        </div>
      </Link>
      {user.friend_request_sent ? (
        <p>Friend request sent</p>
      ) : (
        <button className="p-2" onClick={buttonHandler}>
          Add Friend
        </button>
      )}
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
  }),
  buttonHandler: PropTypes.func,
};
