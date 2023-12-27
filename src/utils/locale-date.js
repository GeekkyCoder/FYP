export const localeDate = (date) => {
  const originalDateObject = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = originalDateObject.toLocaleDateString('en-US', options);
  return formattedDate;
};
