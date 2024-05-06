import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";
import { PurchasedTooltip } from "../tooltips/PurchasedTooltip";
import { getWishlistById } from "../services/wishlist";
import { deleteItem } from "../services/items";
import Iframely from "../Iframely/Iframely";

export const ItemCard = ({
  item,
  listUserId,
  currentUserId,
  currentUserFriends,
  setWishlist,
  spoilValue,
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

  // Conditional rendering based on quantity and spoil_surprises
  if (item.leftover_quantity === 0 && spoilValue) {
    return null; // Hide the item card
  }

  const getPriorityColor = (priorityName) => {
    switch (priorityName) {
      case "Must-Have":
        return "text-red-300 bg-white text-lg w-32 m-auto pt-1 mb-2 shadow-md rounded-3xl";
      case "High Priority":
        return "text-orange-300 bg-white text-lg w-32 m-auto pt-1 mb-2 shadow-md rounded-3xl";
      case "Medium Priority":
        return "text-emerald-200 bg-white text-lg w-40 m-auto pt-1 mb-2 shadow-md rounded-3xl";
      default:
        return "text-blue-300 bg-white text-lg w-32 m-auto pt-1 mb-2 shadow-md rounded-3xl";
    }
  };

  const handlePurchase = () => {
    console.log("purchased");
  };

  return (
    <div className="flex flex-wrap justify-end w-64">
      {listUserId === currentUserId && (
        <div>
          <Link to={`/wishlist/1/editItem/${item.id}`}>
            <EditTooltip tooltipText={"Edit Item"} />
          </Link>

          <DeleteTooltip
            tooltipText={"Delete Item"}
            handleDelete={handleDelete}
          />
        </div>
      )}

      {listUserId !== currentUserId && isUserAFriend && (
        <PurchasedTooltip
          tooltipText={"Mark as Purchased"}
          handlePurchase={handlePurchase}
        />
      )}

      <div className="w-64 pb-3 border-2 bg-gray-200 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-md hover:border-rose-300 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1">
        <Link to={item.website_url} target="_blank">
          <Iframely url={item.website_url} />
          <div className="h-64">
            <h1 className="text-lg text-gray-900 h-20 pl-1 pr-1 flex justify-center items-center">
              {item.name}
            </h1>

            <h2 className="text-sm mt-2 text-gray-900">Note:</h2>
            <p className="mb-1 text-gray-500 text-sm h-10">{item.note}</p>

            <p className={getPriorityColor(item.priority_name)}>
              {item.priority_name}
            </p>

            {!spoilValue &&
            listUserId === currentUserId &&
            item.quantity !== 0 ? (
              <div className="text-gray-900 text-sm">
                <h2 className="text-sm text-gray-900 mb-1">Quantity: </h2>
                <p className="text-gray-500 shadow-lg bg-white pt-3 pl-2 rounded-3xl inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none pr-3 pb-2">
                  Have 0 / Want {item.quantity}
                </p>
              </div>
            ) : (
              <div className="text-gray-900 text-sm">
                <h2 className="text-sm text-gray-900 mb-1">Quantity: </h2>

                <p className="text-gray-500 shadow-lg bg-white pt-3 pl-2 rounded-3xl inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none pr-3 pb-2">
                  Have {item.purchase_quantity} / Want {item.quantity}
                </p>
              </div>
            )}
          </div>
        </Link>
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
    spoil_surprises: PropTypes.bool,
    leftover_quantity: PropTypes.number,
    purchase_quantity: PropTypes.number,
  }).isRequired,
  listUserId: PropTypes.number,
  currentUserId: PropTypes.number,
  currentUserFriends: PropTypes.array,
  setWishlist: PropTypes.func,
  spoilValue: PropTypes.bool,
};
