import { useEffect, useState } from "react";
import { getFilteredWishlists, getWishlists } from "../services/wishlist";
import { WishlistCard } from "./WishlistCard";

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

  return (
    <div>
      <h1>My Wishlists</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for wishlist..."
      />
      <div>
        <h2>
          Private{" "}
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
        </h2>
        {privateWishlists.map((list) => (
          <WishlistCard key={list.id} list={list} private={true} />
        ))}
      </div>
      <div>
        <h2>
          Public{" "}
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
        </h2>
        {publicWishlists.map((list) => (
          <WishlistCard key={list.id} list={list} private={false} />
        ))}
      </div>
    </div>
  );
};
