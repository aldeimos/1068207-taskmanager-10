import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

const RENDER_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate());
render(siteMainElement, createBoardTemplate());

const siteTaskBoard = siteMainElement.querySelector(`.board__tasks`);

const repeat = (count, fn) => {
  Array(count).fill(``).forEach(fn);
};

repeat(RENDER_COUNT, () => {
  render(siteTaskBoard, createTaskTemplate(), `afterbegin`);
});

render(siteTaskBoard, createTaskEditTemplate(), `afterbegin`);

const siteBoard = siteMainElement.querySelector(`.board`);

render(siteBoard, createLoadMoreButtonTemplate());
