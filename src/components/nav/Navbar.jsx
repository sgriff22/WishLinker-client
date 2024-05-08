import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

export const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { profile, setProfile } = useContext(AppContext);

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem("wish_token");

    setProfile({});

    // Navigate to the login page
    navigate("/");
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
    <nav className="fixed top-0 left-0 right-0 bg-white py-2 z-30 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to={"/home"}>
              <img
                className="h-10 w-auto ml-2"
                src="public/media/images/Wish_logo.png"
                alt="WishLinker logo"
              />
            </NavLink>
          </div>
          <div>
            {!localStorage.getItem("wish_token") ? (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="mr-2"
              >
                Login
              </button>
            ) : (
              <button onClick={toggleDropdown} className="mr-2">
                <i className="fa-solid fa-user"></i>
              </button>
            )}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="mr-2 p-4 text-left absolute top-16 right-0 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <ul>
                  <li className="text-lg -mt-1 font-semibold">
                    {profile.user?.first_name} {profile.user?.last_name}
                    <div className="text-sm -mt-2 text-gray-400">
                      {profile.user.username}
                    </div>
                    <div className="border-t border-black mb-2"></div>{" "}
                  </li>
                  <li>
                    <NavLink to={"/mylists"}>My Lists</NavLink>
                  </li>
                  <li>
                    <NavLink to={"wishlist/newWishlist"}>New List</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/friends"}>Friends</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/purchases"}>MyPurchases</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/profile"}>Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="mt-3 font-semibold">
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
