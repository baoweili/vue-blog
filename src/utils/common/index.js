const getDateFromMilliseconds = (milliseconds) => {
  const time = new Date(milliseconds);
  let year = time.getFullYear(),
      month = time.getMonth() + 1,
      day = time.getDate();
  return { year, month, day };
}

export {
  getDateFromMilliseconds
}