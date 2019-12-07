import {
  getRandomArrayItem,
  getRandomIntegerFromGap
} from '../utils.js';
import {
  colors
} from '../const.js';

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const defaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];


const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerFromGap(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () =>
  Object.keys(defaultRepeatingDays).reduce((acc, cur) =>
    Object.assign(acc, {
      [cur]: Math.random() > 0.5
    }), {});

const generateTags = (tagsList) => {
  return tagsList
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(descriptionItems),
    dueDate,
    repeatingDays: dueDate ? defaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(tags)),
    color: getRandomArrayItem(colors),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
    isDone: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {
  generateTask,
  generateTasks
};
