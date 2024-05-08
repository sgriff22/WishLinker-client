import { useState } from "react";
import PropTypes from "prop-types";

export const Calendar = ({ events, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDay();
    const days = [];

    // Render empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Render days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isCurrentDate =
        currentDay.toDateString() === new Date().toDateString();
      const eventForDate = events.find(
        (event) => event.date.toDateString() === currentDay.toDateString()
      );

      const dayClass = `w-8 h-8 text-lg flex items-center justify-center rounded-lg hover:pink-bg hover:text-white  ${
        isCurrentDate || eventForDate ? "form-button text-white" : ""
      } cursor-pointer`;

      days.push(
        <div
          key={i}
          className={dayClass}
          onClick={() => onDateClick(eventForDate)}
        >
          {i}
        </div>
      );
    }

    // Render empty cells for the days after the last day of the month
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
      days.push(
        <div key={`empty-${i}-${Math.random()}`} className="w-8 h-8"></div>
      );
    }

    return days;
  };

  const renderWeekDays = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDays.map((day) => (
      <div className="text-sm" key={day}>
        {day}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-white py-2 px-4 border shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <i
          className="fa-solid fa-caret-left rose"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        />

        <span className="font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <i
          className="fa-solid fa-caret-right rose"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        />
      </div>
      <div className="grid grid-cols-7">
        {renderWeekDays()}
        {renderDays()}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.array,
  onDateClick: PropTypes.func,
};
