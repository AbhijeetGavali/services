function convertToInitialTime(timestamp) {
  const date = new Date(timestamp);
  const minutes = date.getMinutes();
  const roundedMinutes = Math.floor(minutes / 30) * 30;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
}

module.exports = {
  convertToInitialTime,
};
