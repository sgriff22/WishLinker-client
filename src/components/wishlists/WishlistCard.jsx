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
            <div className="h-full text-left flex border-gray-200 border p-4 rounded-lg bg-gray-100">
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
