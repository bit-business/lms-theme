export const dateSlicing = (givenDate) => {
  let dateString;
  if (givenDate) {
    dateString = givenDate.slice(-1) === "Z"
      ? givenDate
      : `${givenDate}Z`;
  }
  let date = new Date(dateString);
  date = date.toString().split(" ");
  return (
    date[0] + ", " + date[2] + " " + date[1] + " " + date[3]
  );
};
