export const getCurrentDate = format => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  /* return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`; */

  switch (format) {
    case 'YYMMDD':
      return `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
    case 'MMDDYY':
      return `${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}-${year}`;
    default:
      return `${day.toString().padStart(2, '0')}-${month
        .toString()
        .padStart(2, '0')}-${year}`;
  }
};
