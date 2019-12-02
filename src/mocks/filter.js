const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      title: it,
      count: 0,
    };
  });
};


export {generateFilters};
