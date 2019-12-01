const getRandomInt = (int) => {
  return Math.floor(Math.random() * int);
};

const getRandomIntegerFromGap = (min, max) => {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerFromGap(0, array.length);

  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
  formatTime,
  castTimeFormat
};
