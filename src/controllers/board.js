import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import AlertComponent from '../components/alert.js';
import LoadMoreButton from '../components/load-more-button.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';

const renderTask = (taskList, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEditButtonClick = () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  taskEditComponent.setSubmitButtonClickHandler(replaceEditToTask);
  taskComponent.setEditButtonClickHandler(onEditButtonClick);

  render(taskList, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

export default class Board {
  constructor(container) {
    this._container = container;

    this._alert = new AlertComponent();
    this._task = new TaskComponent();
    this._loadMoreButton = new LoadMoreButton();
  }
  render(tasks, renderCount) {
    const container = this._container;
    const RENDER_COUNT = renderCount;
    let visibleTasks = 8;
    const taskListElement = container.getElement().querySelector(`.board__tasks`);

    const checkTasksStatus = (items) => {
      const status = items.every((it) => it.isDone === true);
      if (status) {
        const alertComponent = this._alert.getElement();
        container.getElement().replaceChild(alertComponent, taskListElement);
        return;
      }
      render(container.getElement(), this._loadMoreButton.getElement(), RenderPosition.BEFOREEND);
    };

    checkTasksStatus(tasks);

    tasks.slice(0, visibleTasks).forEach((task) => renderTask(taskListElement, task));

    const onShowMoreTasksButtonClick = () => {
      let tasksToShow = RENDER_COUNT - visibleTasks;
      visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
      taskListElement.innerHTML = ``;
      tasks.slice(0, visibleTasks).forEach((task) => renderTask(taskListElement, task));
      if (visibleTasks === RENDER_COUNT) {
        remove(this._loadMoreButton);
      }
    };

    this._loadMoreButton.setClickHandler(onShowMoreTasksButtonClick);
  }
}

