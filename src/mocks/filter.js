const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const getFiltersCount = (tasks, filterName) => {
  switch (filterName) {
    case `all`:
      return tasks.length;
    case `overdue`:
      return tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length;
    case `today`:
      return tasks.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length;
    case `favorites`:
      return tasks.filter((task) => task.isFavorite).length;
    case `repeating`:
      return tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
    case `tags`:
      return tasks.filter((task) => task.tags.size).length;
    case `archive`:
      return tasks.filter((task) => task.isArchive).length;
    default:
      return 0;
  }
};

const generateFilters = (tasks) => {
  return filterNames.map((name) => {
    return {
      title: name,
      count: getFiltersCount(tasks, name),
    };
  });
};


export {generateFilters};
