export const convertDate = date => {
  const convertedDate = new Date(date.toString());
  const year = convertedDate.getFullYear();
  let month = convertedDate.getMonth() + 1;
  let dt = convertedDate.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
};
