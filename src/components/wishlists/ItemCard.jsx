import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ItemCard = ({ item }) => {
  return (
    <Link to={item.website_url} target="_blank">
      <div className="border border-solid border-gray-400">
        <h2>{item.name}</h2>
        <p>Note/Preferences:</p>
        <p>{item.note}</p>
        <p>{item.priority_name}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </Link>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    website_url: PropTypes.string.isRequired,
    note: PropTypes.string,
    priority_name: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
