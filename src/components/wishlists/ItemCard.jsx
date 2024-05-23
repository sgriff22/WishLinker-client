import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { EditTooltip } from "../tooltips/EditTooltip";
import { DeleteTooltip } from "../tooltips/DeleteTooltip";
import { PurchasedTooltip } from "../tooltips/PurchasedTooltip";
import { getWishlistById } from "../services/wishlist";
import { deleteItem } from "../services/items";
import Iframely from "../Iframely/Iframely";
import { createPurchase } from "../services/purchases";

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

  const { listId } = useParams();

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

  const getPriorityColor = (priorityName) => {
    switch (priorityName) {
      case "Must-Have":
        return "text-red-300 bg-white text-sm w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center";
      case "High Priority":
        return "text-orange-300 bg-white text-sm w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center";
      case "Medium Priority":
        return "text-emerald-200 bg-white text-sm  w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center";
      default:
        return "text-blue-300 bg-white text-sm w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center";
    }
  };

  const handlePurchase = () => {
    const isConfirmed = window.confirm(`Did you purchase ${item.name}?`);

    if (isConfirmed) {
      let purchasedQuantity = window.prompt(
        `How many ${item.name}'s did you purchase?`
      );

      // Convert the input to an integer
      purchasedQuantity = parseInt(purchasedQuantity);

      // Check if the input is a valid number and greater than 0
      if (!isNaN(purchasedQuantity) && purchasedQuantity > 0) {
        const isQuantityConfirmed = window.confirm(
          `Confirm: You purchased ${purchasedQuantity} ${item.name}(s)?`
        );

        if (isQuantityConfirmed) {
          const purchase = {
            wishlist_item: item.id,
            quantity: purchasedQuantity,
          };
          createPurchase(purchase).then(() => {
            getWishlistById(item.wishlist).then((res) => {
              window.alert(`Purchased`);
              setWishlist(res);
            });
          });
        } else {
          window.alert("Purchase canceled.");
        }
      } else {
        window.alert("Please enter a valid quantity.");
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-end w-64">
      <div className="pb-3 border bg-gray-200 border-gray-300 border-opacity-60 rounded-lg hover:shadow-md hover:border-rose-300 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1">
        <Link to={item.website_url} target="_blank">
          <div>
            <Iframely url={item.website_url} />
            <div className="px-3 text-left">
              <h1 className="text-lg text-gray-900">{item.name}</h1>

              <h2 className="text-sm mt-2 text-gray-900">Note:</h2>
              <p className="mb-1 text-gray-500 text-sm">{item.note}</p>

              <div className="flex justify-between">
                <div>
                  <h2 className="text-sm text-gray-900 mb-1">Priority:</h2>
                  <p className={getPriorityColor(item.priority_name)}>
                    {item.priority_name}
                  </p>
                </div>

                {!spoilValue &&
                listUserId === currentUserId &&
                item.quantity !== 0 ? (
                  <div className="text-gray-900 text-sm">
                    <h2 className="text-sm text-gray-900 mb-1">Quantity: </h2>

                    <p className="text-gray-500 bg-white text-sm w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center">
                      Have 0 / Want {item.quantity}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-900 text-sm">
                    <h2 className="text-sm text-gray-900 mb-1">Quantity: </h2>

                    <p className="text-gray-500 bg-white text-sm w-28 m-auto pt-1 mb-2 shadow-md rounded-3xl text-center">
                      Have {item.purchase_quantity} / Want {item.quantity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
        <div className="h-7">
          {listUserId === currentUserId && (
            <div className="absolute bottom-0 left-0 mb-2 text-xl">
              <Link to={`/wishlist/${listId}/editItem/${item.id}`}>
                <EditTooltip tooltipText={"Edit Item"} />
              </Link>

              <DeleteTooltip
                tooltipText={"Delete Item"}
                handleDelete={handleDelete}
              />
            </div>
          )}
          {listUserId !== currentUserId && isUserAFriend && (
            <div className="absolute bottom-0 left-0 ml-3 mb-2">
              <PurchasedTooltip
                tooltipText={"Mark as Purchased"}
                handlePurchase={handlePurchase}
              />
            </div>
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
