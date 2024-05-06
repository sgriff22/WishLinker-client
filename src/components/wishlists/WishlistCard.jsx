import PropTypes from "prop-types";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";

export const WishlistCard = ({ list }) => {
  const formatedDate = formatDate(list.creation_date);

  return (
    <Link to={`/wishlist/${list.id}`}>
      <div className="p-4 mb-5 h-32 text-left border-gray-200 border shadow-sm rounded-lg bg-white hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
        <h3 className="-mt-1">{list.title}</h3>
        <p className="text-sm">{list.description}</p>
        <p className="text-sm font-semibold">{formatedDate}</p>
      </div>
    </Link>
  );
};

WishlistCard.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    spoil_surprises: PropTypes.bool,
    address: PropTypes.string,
    creation_date: PropTypes.string,
    date_of_event: PropTypes.string,
    pinned: PropTypes.bool,
  }),
};
