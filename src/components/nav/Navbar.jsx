import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem("wish_token");

    // Navigate to the login page
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-300 py-4 z-30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to={"/"}>
              <img
                className="h-12 w-auto ml-2"
                src="public/media/images/Wish_logo.png"
                alt="WishLinker logo"
              />
            </NavLink>
          </div>
          <div>
            <button onClick={toggleDropdown} className="mr-2">
              <i className="fa-solid fa-user"></i>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="mr-2 p-7 text-left absolute top-20 right-0 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <ul>
                  <li>
                    <NavLink to={"/mylists"}>My Lists</NavLink>
                  </li>
                  <li>
                    <NavLink to={"wishlist/newWishlist"}>New List</NavLink>
                  </li>
                  <li>Friends</li>
                  <li>Profile</li>
                  <li>
                    <button onClick={handleLogout} className="mt-5">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
