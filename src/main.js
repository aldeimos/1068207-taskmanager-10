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

const tasks = generateTasks(RENDER_COUNT);
console.log(tasks);

const filters = generateFilters(tasks);
console.log(filters);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let visibleTasks = 8;
tasks.slice(1, visibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);


const loadMoreButton = document.querySelector(`.load-more`);


const onShowMoreTasksButtonClick = () => {
  let tasksToShow = RENDER_COUNT - visibleTasks;
  visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
  taskListElement.innerHTML = ``;
  render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
  tasks.slice(1, visibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
  if (visibleTasks === RENDER_COUNT) {
    loadMoreButton.style.display = `none`;
  }
};

loadMoreButton.addEventListener(`click`, onShowMoreTasksButtonClick);
