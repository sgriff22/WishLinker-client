import PropTypes from "prop-types";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";

export const WishlistCard = ({ list }) => {
  const formatedDate = formatDate(list.creation_date);

  return (
    <Link to={`/wishlist/${list.id}`}>
      <div>
        <div>
          <div>
            <div className="h-full text-left flex border-gray-200 border p-4 rounded-lg">
              <div>
                <h2>{list.title}</h2>
                <p>{list.description}</p>
                <p>{formatedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

WishlistCard.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    spoil_surprises: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
    date_of_event: PropTypes.string.isRequired,
    pinned: PropTypes.bool.isRequired,
  }).isRequired,
};
