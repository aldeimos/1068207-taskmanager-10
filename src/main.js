import {
  createBoardTemplate
} from './components/board.js';
import {
  createLoadMoreButtonTemplate
} from './components/load-more-button';
import {
  createTaskEditTemplate
} from './components/task-edit.js';
import {
  createTaskTemplate
} from './components/task.js';
import {
  createSiteMenuTemplate
} from './components/site-menu.js';
import {
  createFilterTemplate
} from './components/filter.js';
import {
  generateTasks
} from './mocks/task.js';
import {
  generateFilters
} from './mocks/filter.js';


const RENDER_COUNT = 22;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(RENDER_COUNT);
console.log(tasks);

const amountOfOverdueTasks = tasks.filter((it) => {
  const currentDate = new Date();
  const taskDate = it.dueDate;
  return (Date.parse(currentDate) > Date.parse(taskDate));
});

siteMainElement.querySelector(`.filter__overdue-count`).textContent = amountOfOverdueTasks.length;

const amountOfTodayTasks = tasks.filter((it) => {
  const currentDate = new Date();
  const taskDate = it.dueDate;
  return taskDate !== null ? currentDate.getDate() === taskDate.getDate() && currentDate.getMonth() === taskDate.getMonth() : false;
});

siteMainElement.querySelector(`.filter__today-count`).textContent = amountOfTodayTasks.length;

const calculateFilters = (prop, querySelector) => {
  const array = tasks.filter((it) => it[prop]);
  siteMainElement.querySelector(`${querySelector}`).textContent = array.length;
};

calculateFilters(`isFavorite`, `.filter__favorites-count`);
calculateFilters(`isArchive`, `.filter__archive-count`);

const amoutOfTagsTasks = tasks.filter((it) => it.tags.size > 0);
siteMainElement.querySelector(`.filter__tags-count`).textContent = amoutOfTagsTasks.length;

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let visibleTasks = 8;
tasks.slice(1, visibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const allTasks = siteMainElement.querySelector(`.filter__all-count`);
allTasks.textContent = RENDER_COUNT;

const loadMoreButton = document.querySelector(`.load-more`);


const onClickShowMoreTasksButton = () => {
  let tasksToShow = RENDER_COUNT - visibleTasks;
  visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
  taskListElement.innerHTML = ``;
  render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
  tasks.slice(1, visibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
  if (visibleTasks === RENDER_COUNT) {
    loadMoreButton.style.display = `none`;
  }
};

loadMoreButton.addEventListener(`click`, onClickShowMoreTasksButton);