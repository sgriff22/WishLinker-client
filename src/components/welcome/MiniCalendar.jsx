import { useContext, useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { getUpcomingEvents } from "../services/wishlist";
import { formatDate } from "../../utils";
import AppContext from "../../context/AppContext";

export const MiniCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(null);

  const { profile } = useContext(AppContext);

  useEffect(() => {
    getUpcomingEvents().then((res) => {
      setEvents(res);
      const today = new Date();
      const eventsForToday = res.filter((event) => {
        const eventDate = new Date(event.date_of_event);
        return eventDate.toDateString() === today.toDateString();
      });
      setSelectedEvents(eventsForToday);
    });
  }, []);

  const handleDateClick = (event) => {
    setSelectedEvents(event);
  };

  return (
    <div>
      <Calendar events={events} onDateClick={handleDateClick} />
      {selectedEvents && selectedEvents.length > 0 ? (
        <div className="mt-4 text-left">
          <h3 className="text-lg font-bold">Event Information</h3>
          {selectedEvents.map((event, index) => (
            <div key={index} className="mb-5 text-lg">
              <p>Date: {formatDate(event.date_of_event)}</p>
              <p>Title: {event.title}</p>
              <p>
                For: {""}
                {event.user.id === profile.user.id
                  ? "Your event"
                  : `${event.user.first_name} ${event.user.last_name}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-left">
          <h3 className="text-lg font-bold">No Events</h3>
        </div>
      )}
    </div>
  );
};
