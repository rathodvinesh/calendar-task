import React, { useMemo, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
import PropTypes from "prop-types";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import event from "../../resources/events";
import * as dates from "../../resources/dates";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";

const localizer = momentLocalizer(moment);

const MyCal = () => {
  const [events, setEvents] = useState([]);

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(), // Dynamically set to today's date
      max: dates.add(dates.endOf(new Date(), "day"), -1, "hours"), // Maximum time is the end of today minus 1 hour
      //   views: ["month", "week", "day", "agenda"], // Limit views to common options

      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        components={components}
        defaultDate={defaultDate}
        // showMultiDayTimes
        // step={60}
        views={views}
        max={max}
        localizer={localizer}
        events={events}
        // eventPropGetter={(event) => ({
        //   style: {
        //     backgroundColor: event.id % 2 === 0 ? "#3174ad" : "#f54242",
        //   },
        // })}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(slotInfo) => {
          const title = window.prompt("Enter Event Title:");
          if (title) {
            setEvents([
              ...events,
              {
                id: events.length + 1,
                title,
                start: slotInfo.start,
                end: slotInfo.end,
                color: "lightblue",
              },
            ]);
          }
        }}
        onSelectEvent={(event) => {
          const newTitle = window.prompt("Edit Event Title:", event.title);
          if (newTitle) {
            setEvents(
              events.map((evt) =>
                evt.id === event.id ? { ...evt, title: newTitle } : evt
              )
            );
          }
        }}
        // views={["month", "week", "day"]}
        style={{ height: 500 }}
      />
    </div>
  );
};

// MyCalendar.propTypes = {
//   localizer: PropTypes.instanceOf(DateLocalizer),
//   //   showDemoLink: PropTypes.bool,
// };
export default MyCal;

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import * as dates from "../../resources/dates";
// import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

// import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 1,
//       title: "Team Meeting",
//       start: new Date(2024, 10, 23, 10, 0), // November 23, 2024, 10:00 AM
//       end: new Date(2024, 10, 23, 11, 0), // November 23, 2024, 11:00 AM
//     },
//     {
//       id: 2,
//       title: "Project Deadline",
//       start: new Date(2024, 10, 30, 17, 0), // November 30, 2024, 5:00 PM
//       end: new Date(2024, 10, 30, 18, 0), // November 30, 2024, 6:00 PM
//     },
//   ]);

//   return (
//     <div style={{ height: "80vh" }}>
//       <Calendar
//         localizer={localizer}
//         defaultDate={new Date()} // Set to today
//         defaultView="month" // Default view is the monthly view
//         events={events} // Events array
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         selectable
//         onSelectSlot={(slotInfo) => {
//           const title = window.prompt("Enter Event Title:");
//           if (title) {
//             setEvents([
//               ...events,
//               {
//                 id: events.length + 1,
//                 title,
//                 start: slotInfo.start,
//                 end: slotInfo.end,
//               },
//             ]);
//           }
//         }}
//         onSelectEvent={(event) => {
//           const newTitle = window.prompt("Edit Event Title:", event.title);
//           if (newTitle) {
//             setEvents(
//               events.map((evt) =>
//                 evt.id === event.id ? { ...evt, title: newTitle } : evt
//               )
//             );
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default MyCalendar;
