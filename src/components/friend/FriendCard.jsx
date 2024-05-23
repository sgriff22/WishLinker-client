import PropTypes from "prop-types";

export const FriendCard = ({ friend }) => {
  return (
    <div className="max-w-md bg-white shadow-md rounded-lg mx-auto flex items-center p-3 m-5 hover:border-2 hover:border-rose-300 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
      {friend.profile.image ? (
        <img
          className="w-16 h-16 object-contain object-center overflow-hidden mr-4"
          src={friend.profile.image}
          alt={`Image of ${friend.first_name} ${friend.last_name}`}
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
          {friend.first_name} {friend.last_name}
        </h1>
        <p className="text-gray-600 text-left text-sm">{friend.username}</p>
      </div>
    </div>
  );
};

FriendCard.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    profile: PropTypes.shape({
      image: PropTypes.string,
    }),
  }),
};
