import { useState } from "react";
import { Calendar } from "./Calendar";

export const MiniCalendar = () => {
  const [events] = useState([
    { date: new Date(2024, 4, 7), title: "Birthday Party" },
    { date: new Date(2024, 4, 15), title: "Project Deadline" },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <Calendar events={events} onDateClick={handleDateClick} />
      {selectedEvent && (
        <div className="mt-4 text-left">
          <h3 className="text-lg font-bold">Event Information</h3>
          <p>Date: {selectedEvent.date.toLocaleDateString()}</p>
          <p>Title: {selectedEvent.title}</p>
          <p>For:</p>
        </div>
      )}
    </div>
  );
};
