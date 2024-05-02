import { time } from "console";
import React from "react";
// import { format } from 'date-fns';

export function TimeStamp() {
  const currentTime = new Date();

  // Format the date and time as a string
  //  const formattedTime = new Intl.NumberFormat(currentTime, 'yyyy-MM-dd HH:mm:ss');
  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(currentTime);

  return <div>{formattedTime}</div>;
}

// const TimestampComponent: React.FC = () => {
//   // Create a new Date object for the current time
//   const currentTime = new Date();

//   // Format the date and time as a string
//   //  const formattedTime = new Intl.NumberFormat(currentTime, 'yyyy-MM-dd HH:mm:ss');
//   const formattedTime = new Intl.DateTimeFormat().format(currentTime);

//   return <div>Current Time: {formattedTime}</div>;
// };

export default TimeStamp;
