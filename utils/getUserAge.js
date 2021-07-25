export const getUserAge = birthdate => {
  const today = new Date();
  const bd = new Date(birthdate);

  let age = today.getFullYear() - bd.getFullYear();
  const m = today.getMonth() - bd.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) {
    age--;
  }

  return age;
};
