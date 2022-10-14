//ddmmyyyy
const convertDate = (myDate) => {
  const convertedDate = myDate.split(",")[0];
  console.log(convertedDate);
  return convertedDate;
};

const reverseDate = (oldDate) => {
  let newDates = oldDate.split("-");
  return newDates[2] + "-" + newDates[1] + "-" + newDates[0];
};
module.exports = {
  convertDate,
  reverseDate,
};
