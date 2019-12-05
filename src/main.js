import BoardComponent from './components/board.js';
import LoadMoreButton from './components/load-more-button';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mocks/task.js';
import {generateFilters} from './mocks/filter.js';
import {render, RenderPosition} from './utils.js';

const RENDER_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
const tasks = generateTasks(RENDER_COUNT);
const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new BoardComponent().getElement(), RenderPosition.BEFOREEND);
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(boardElement, new LoadMoreButton().getElement(), RenderPosition.BEFOREEND);
const loadMoreButton = document.querySelector(`.load-more`);

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

let visibleTasks = 8;
tasks.slice(0, visibleTasks).forEach((task) => renderTask(task));

const onShowMoreTasksButtonClick = () => {
  let tasksToShow = RENDER_COUNT - visibleTasks;
  visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
  taskListElement.innerHTML = ``;
  tasks.slice(0, visibleTasks).forEach((task) => renderTask(task));
  if (visibleTasks === RENDER_COUNT) {
    loadMoreButton.style.display = `none`;
  }
};

loadMoreButton.addEventListener(`click`, onShowMoreTasksButtonClick);
