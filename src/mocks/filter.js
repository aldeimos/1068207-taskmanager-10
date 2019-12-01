import {getRandomInt} from '../utils.js';
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: getRandomInt(10),
    };
  });
};


export {generateFilters};
