export const parseTime = (myDate) => {
  const time = new Date(myDate).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
  });
  return time;
};

export const parseDate = (myDate) => {
  let date = new Date(myDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return dt + "/" + month + "/" + year;
};
