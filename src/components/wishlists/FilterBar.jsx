import { useEffect, useState } from "react";
import { getFilteredItems } from "../services/wishlist";
import PropTypes from "prop-types";
import { getPriorities } from "../services/priority";

export const FilterBar = ({ setWishlist, id }) => {
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
    <div>
      <input
        name="search"
        type="text"
        value={searchQuery}
        placeholder="Search for item"
        onChange={handleInputChange}
        className="mb-5 mt-5 mr-5"
      />
      <select
        value={selectedPriority}
        name="priority"
        onChange={handlePriorityChange}
      >
        <option value="">Select Priority</option>
        {priorities.map((priority) => (
          <option key={priority.id} value={priority.name}>
            {priority.name}
          </option>
        ))}
      </select>
    </div>
  );
};

FilterBar.propTypes = {
  setWishlist: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};