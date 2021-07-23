const formatDate = bd =>
  `${bd.year}-${bd.month.toString().padStart(2, '0')}-${bd.day
    .toString()
    .padStart(2, '0')}`;

export default formatDate;
