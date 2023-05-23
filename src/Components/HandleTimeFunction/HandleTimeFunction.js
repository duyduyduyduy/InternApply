const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const handleTimeAll = (string) => {
  let newDate = new Date(string);
  let info = {
    day: weekday[newDate.getDay()],
    month: month[newDate.getMonth()]?.slice(0, 3),
    date: newDate.getDate(),
    hour: newDate.getHours(),
    minute: newDate.getMinutes(),
    year: newDate.getFullYear(),
    second: newDate.getSeconds(),
  };
  return info;
};
export default handleTimeAll;
