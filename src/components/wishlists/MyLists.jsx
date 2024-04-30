import { useEffect, useState } from "react";
import { getFilteredWishlists, getWishlists } from "../services/wishlist";
import { WishlistCard } from "./WishlistCard";
import { useNavigate } from "react-router-dom";
import { AddTooltip } from "../tooltips/AddTooltip";

export const MyLists = () => {
  const [publicWishlists, setPublicWishlists] = useState([]);
  const [privateWishlists, setPrivateWishlists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getWishlists().then((res) => {
      setPublicWishlists(res.public);
      setPrivateWishlists(res.private);
    });
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Initiate API request with search query parameter
    getFilteredWishlists(query).then((res) => {
      setPublicWishlists(res.public);
      setPrivateWishlists(res.private);
    });
  };
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Wishlists</h1>
      <input
        type="text"
        name="search"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for wishlist..."
        className="my-5 text-lg p-1 rounded-lg border border-gray-400"
      />
      <div className="flex justify-between">
        <div>
          <h2 className="flex justify-between">
            Private{" "}
            <span onClick={() => navigate("/wishlist/newWishlist")}>
              <AddTooltip tooltipText={"Create New Wishlist"} />
            </span>
          </h2>
          {privateWishlists.map((list) => (
            <WishlistCard key={list.id} list={list} private={true} />
          ))}
        </div>
        <div>
          <h2 className="flex justify-between">
            Public{" "}
            <span onClick={() => navigate("/wishlist/newWishlist")}>
              <AddTooltip tooltipText={"Create New Wishlist"} />
            </span>
          </h2>
          {publicWishlists.map((list) => (
            <WishlistCard key={list.id} list={list} private={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
