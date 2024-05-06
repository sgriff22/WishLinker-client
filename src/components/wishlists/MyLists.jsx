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
        className="my-5 text-lg px-2 pt-1 border rounded-md shadow-sm"
      />
      <div className="flex justify-between">
        <div className="w-1/2 mr-20">
          <h1 className="flex justify-between text-3xl mb-2">
            Private{" "}
            <span
              onClick={() =>
                navigate("/wishlist/newWishlist", {
                  state: { isPrivate: true },
                })
              }
            >
              <AddTooltip tooltipText={"Create New Wishlist"} />
            </span>
          </h1>
          {privateWishlists.map((list) => (
            <WishlistCard key={list.id} list={list} private={true} />
          ))}
        </div>
        <div className="w-1/2">
          <h1 className="flex justify-between text-3xl mb-2">
            Public{" "}
            <span onClick={() => navigate("/wishlist/newWishlist")}>
              <AddTooltip tooltipText={"Create New Wishlist"} />
            </span>
          </h1>
          {publicWishlists.map((list) => (
            <WishlistCard key={list.id} list={list} private={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
