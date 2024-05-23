import { useEffect, useState } from "react";
import { getFilteredItems } from "../services/wishlist";
import PropTypes from "prop-types";
import { getPriorities } from "../services/priority";
import { AddTooltip } from "../tooltips/AddTooltip";
import { Link } from "react-router-dom";

export const FilterBar = ({ setWishlist, id, listUserId, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    getPriorities().then((res) => {
      setPriorities(res);
    });
  }, []);

  // Handle search input change
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Initiate API request with search query parameter
    getFilteredItems(id, query, selectedPriority).then((res) => {
      setWishlist(res);
    });
  };

  // Handle priority selection change
  const handlePriorityChange = (event) => {
    const priority = event.target.value;
    setSelectedPriority(priority);
    // Initiate API request with selected priority
    getFilteredItems(id, searchQuery, priority).then((res) => {
      setWishlist(res);
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <input
          name="search"
          type="text"
          value={searchQuery}
          placeholder="Search for item..."
          onChange={handleInputChange}
          className="my-5 text-lg px-2 pt-1 border rounded-md shadow-sm"
        />
        {currentUserId === listUserId && (
          <Link to={`/wishlist/${id}/newItem`}>
            <AddTooltip tooltipText={"Add New Item"} />
          </Link>
        )}
      </div>

      {currentUserId !== listUserId && (
        <select
          className="w-55 text-lg px-2 pb-1 pt-2 border rounded-md shadow-sm text-gray-400"
          value={selectedPriority}
          name="priority"
          onChange={handlePriorityChange}
        >
          <option value="">Filter by priority level</option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.name}>
              {priority.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  setWishlist: PropTypes.func.isRequired,
  id: PropTypes.number,
  currentUserId: PropTypes.number,
  listUserId: PropTypes.number,
};
