import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
// import DemoLink from "../../DemoLink.component";
import events from "../../resources/events";
import * as dates from "../../resources/dates";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function MyCalendar() {
  const [eventss, setEvents] = useState([]);
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <Fragment>
      {/* {showDemoLink ? <DemoLink fileName="basic" /> : null} */}
      <div className="h-screen w-screen sm:p-5 md:p-4 lg:p-6 xl:p-8">
        <Calendar
          components={components}
          events={events}
          localizer={localizer}
          dayLayoutAlgorithm={"allWeek"}
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
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </Fragment>
  );
}

// exports default ColoredDateCellWrapper;
