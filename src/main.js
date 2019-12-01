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

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let VisibleTasks = 8;
tasks.slice(1, VisibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = document.querySelector(`.load-more`);

const shomMoreTasks = () => {
  let tasksToShow = RENDER_COUNT - VisibleTasks;
  VisibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
  taskListElement.innerHTML = ``;
  render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
  tasks.slice(1, VisibleTasks).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
  if (VisibleTasks === RENDER_COUNT) {
    loadMoreButton.style.display = `none`;
  }
};

loadMoreButton.addEventListener(`click`, shomMoreTasks);
