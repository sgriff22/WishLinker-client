import { useContext, useEffect, useState } from "react";

import { addFriend, getFilteredUsers, getUsers } from "../services/friends";
import { UserCard } from "./UserCard";
import AppContext from "../../context/AppContext";
import { getCurrentUserProfile } from "../services/profile";

export const SearchFriend = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { setProfile } = useContext(AppContext);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    // Define a function to fetch filtered users
    const fetchFilteredUsers = async () => {
      try {
        // Make API request with the latest search query
        const res = await getFilteredUsers(searchQuery);
        setUsers(res);
      } catch (error) {
        console.error("Error fetching filtered users:", error);
      }
    };

    fetchFilteredUsers();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleAddFriend = (userId) => {
    addFriend(userId).then(() => {
      getUsers().then((res) => {
        setUsers(res);
        getCurrentUserProfile().then((res) => {
          setProfile(res);
        });
      });
    });
  };

  return (
    <div>
      <h1>Search For Friends</h1>
      <div>
        <input
          name="search"
          type="text"
          value={searchQuery}
          placeholder="Search for item"
          onChange={handleInputChange}
          className="mb-5 mt-5 mr-5 text-lg p-1 rounded-lg border border-gray-400"
        />

        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            buttonHandler={() => handleAddFriend(u.id)}
          />
        ))}
      </div>
    </div>
  );
};
