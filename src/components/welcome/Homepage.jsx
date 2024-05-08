/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { MiniCalendar } from "./MiniCalendar";

export const Homepage = () => {
  const { profile } = useContext(AppContext);

  if (!profile || !profile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {profile.user.first_name}!</h1>
      <div>
        <h2>Pinned Wishlists</h2>
      </div>
      <div>
        <h2>Your Friend's Newest Lists</h2>
      </div>
      <div className="flex flex-wrap justify-center bg-gray-200 w-80 pb-7 pt-4 rounded-xl shadow-md">
        <h2 className="w-full mb-2">Upcoming Events</h2>
        <MiniCalendar />
      </div>
      <div></div>
    </div>
  );
};
