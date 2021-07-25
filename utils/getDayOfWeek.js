export const getDayOfWeek = dateString => {
  const weekday = dateString ? new Date(dateString) : new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[weekday.getDay()];
};
