"use client";

import { THEME } from "@/utils/constants";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Calendar, CalendarContent, CalendarHeader } from "../ui/calendar";
import { Typography } from "../ui/typography";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Calendar className={`${THEME.secBg} p-4 rounded-md`}>
      <ReactCalendar
        onChange={onChange}
        value={value}
        tileClassName={"dark:hover:!bg-neutral-700"}
        className={`!bg-neutral-100 dark:!bg-neutral-800 p-4`}
      />
      <CalendarHeader headerElipses headerTitle="Events" className="my-4" />
      <CalendarContent>
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 dark:dark:border-primary border-t-4 even:border-t-muted odd:border-t-secondary dark:even:border-t-neutral-400 dark:odd:border-t-secondary-dark"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <Typography variant="h5" className="font-semibold text-gray-600">
                {event.title}
              </Typography>
              <Typography
                variant="span"
                className="text-gray-500 dark:text-neutral-400 text-xs"
              >
                {event.time}
              </Typography>
            </div>
            <Typography
              variant="p"
              className="mt-2 text-gray-500 dark:text-neutral-300 text-sm"
            >
              {event.description}
            </Typography>
          </div>
        ))}
      </CalendarContent>
    </Calendar>
  );
};

export default EventCalendar;
