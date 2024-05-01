import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";
import { PurchasedTooltip } from "../tooltips/PurchasedTooltip";

export const ItemCard = ({
  item,
  listUserId,
  currentUserId,
  currentUserFriends,
}) => {
  
  // Filter the friends list to ensure that the current user is viewing a friend's list
  const isUserAFriend = currentUserFriends?.some(
    (friend) => friend.friend_info.id === listUserId
  );

  return (
    <div>
      {listUserId === currentUserId && (
        <div className="flex justify-end mb-4 mr-10">
          <Link>
            <EditTooltip tooltipText={"Edit Item"} />
          </Link>

          <DeleteTooltip tooltipText={"Delete Item"} />
        </div>
      )}

      <div className="flex items-start">
        <div className="flex-1">
          <Link to={item.website_url} target="_blank">
            <div className="border border-solid border-gray-400 mb-10">
              <h2>{item.name}</h2>
              <p>Note/Preferences:</p>
              <p>{item.note}</p>
              <p>{item.priority_name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </Link>
        </div>

        <div className="m-4">
          {/* only show button if the current user is a friend and not the author of list */}
          {listUserId !== currentUserId && isUserAFriend && (
            <Link>
              <PurchasedTooltip tooltipText={"Mark as Purchased"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    website_url: PropTypes.string.isRequired,
    note: PropTypes.string,
    priority_name: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  listUserId: PropTypes.number,
  currentUserId: PropTypes.number,
  currentUserFriends: PropTypes.array,
};
