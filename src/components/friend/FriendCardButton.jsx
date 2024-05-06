import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const FriendCardButton = ({ friend, buttonText, buttonHandler }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mx-auto flex items-center justify-between p-4 m-5 hover:border-2 hover:border-rose-300 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
      <Link
        to={`/profile/${friend.friend_info.id}`}
        className="flex items-center"
      >
        <img
          className="w-16 h-full object-cover object-center mr-4"
          src="/public/media/images/Wish_logo.png"
          alt="Friend Image"
        />
        <div className="flex-grow">
          <h1 className="text-gray-900 font-semibold text-lg text-left">
            {friend.friend_info.first_name} {friend.friend_info.last_name}
          </h1>
          <p className="text-gray-400 text-left text-lg">
            {friend.friend_info.username}
          </p>
        </div>
      </Link>
      <button className="p-2" onClick={buttonHandler}>
        {buttonText}
      </button>
    </div>
  );
};

FriendCardButton.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    friend_info: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
  buttonText: PropTypes.string,
  buttonHandler: PropTypes.func,
};
