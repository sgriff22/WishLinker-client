import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";
import { PurchasedTooltip } from "../tooltips/PurchasedTooltip";
import { getWishlistById } from "../services/wishlist";
import { deleteItem } from "../services/items";

export const ItemCard = ({
  item,
  listUserId,
  currentUserId,
  currentUserFriends,
  setWishlist,
}) => {
  // Filter the friends list to ensure that the current user is viewing a friend's list
  const isUserAFriend = currentUserFriends?.some(
    (friend) => friend.friend_info.id === listUserId
  );

  const handleDelete = () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If user confirms, proceed with deletion
    if (confirmed) {
      deleteItem(item.id)
        .then(() => {
          getWishlistById(item.wishlist).then((res) => {
            setWishlist(res);
          });
        })
        .catch((error) => {
          console.error("Error deleting wishlist:", error);
        });
    }
  };

  return (
    <div>
      {listUserId === currentUserId && (
        <div className="flex justify-end mb-4 mr-10">
          <Link to={`editItem/${item.id}`}>
            <EditTooltip tooltipText={"Edit Item"} />
          </Link>

          <DeleteTooltip
            tooltipText={"Delete Item"}
            handleDelete={handleDelete}
          />
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
    wishlist: PropTypes.number,
  }).isRequired,
  listUserId: PropTypes.number,
  currentUserId: PropTypes.number,
  currentUserFriends: PropTypes.array,
  setWishlist: PropTypes.func,
};
