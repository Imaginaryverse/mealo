export const getDayOfWeek = () => {
  const currentDate = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[currentDate.getDay()];
};
