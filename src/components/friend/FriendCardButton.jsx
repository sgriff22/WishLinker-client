import PropTypes from "prop-types";

export const FriendCardButton = ({ friend, buttonText, buttonHandler }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mx-auto flex items-center p-4 m-5">
      <img
        className="w-16 h-full object-cover object-center mr-4"
        src="/public/media/images/Wish_logo.png"
        alt="Friend Image"
      />
      <div className="flex-grow">
        <h1 className="text-gray-900 font-semibold text-lg text-left">
          {friend.friend_info.first_name} {friend.friend_info.last_name}
        </h1>
        <p className="text-gray-600 text-left text-lg">
          {friend.friend_info.username}
        </p>
      </div>
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
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
  buttonText: PropTypes.string,
  buttonHandler: PropTypes.func,
};
