export const sortMealPlanByDay = mp =>
  mp.map(el => el).sort((a, b) => a.day - b.day);

/* const mealPlan = [
  { day: 5, name: 'salad' },
  { day: 3, name: 'chicken' },
  { day: 2, name: 'burrito' },
  { day: 4, name: 'pasta' },
  { day: 1, name: 'tire' },
];

console.log(sortMealPlanByDay(mealPlan)); */
