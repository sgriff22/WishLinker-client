import PropTypes from "prop-types";

export const FriendCard = ({ friend }) => {
  return (
    <div className="flex flex-wrap">
      <div className="p-2 w-full">
        <div className="h-full flex items-center bg-gray-100 border-gray-300 border p-4 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src="https://dummyimage.com/80x80"
          />
          <div>
            <h2 className="text-gray-900 title-font font-medium text-lg">
              {friend.first_name} {friend.last_name}
            </h2>
            <p className="text-gray-500 text-sm">{friend.username}</p>
          </div>
        </div>
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
  }),
};
