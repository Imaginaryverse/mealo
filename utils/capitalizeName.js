export const capitalizeName = name => {
  return name
    .match(/[a-z]+/gi)
    .map(el => el[0].toUpperCase() + el.substring(1))
    .join(' ');
};
