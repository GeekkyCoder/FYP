export const formatDate = (date) => {
  const dateObj = new Date(date);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  return formattedDate;
};
