import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import AlertComponent from '../components/alert.js';
import LoadMoreButton from '../components/load-more-button.js';

import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {Sort, SortType} from '../components/sort.js';

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

const renderTasks = (taskList, tasks) => {
  tasks.forEach((task) => renderTask(taskList, task));
};

export default class Board {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._alert = new AlertComponent();
    this._task = new TaskComponent();
    this._loadMoreButton = new LoadMoreButton();
  }
  render(tasks, renderCount) {
    const container = this._container;
    const RENDER_COUNT = renderCount;
    let visibleTasks = 8;
    const taskListElement = container.getElement().querySelector(`.board__tasks`);
    render(this._container.getElement(), this._sort.getElement(), RenderPosition.AFTERBEGIN);

    const checkTasksStatus = (items) => {
      const status = items.every((it) => it.isDone === true);
      if (status) {
        const alertComponent = this._alert.getElement();
        container.getElement().replaceChild(alertComponent, taskListElement);
        return;
      }
    };

    const renderLoadMoreButton = (array) => {
      if (visibleTasks >= array.length) {
        return;
      }
      render(container.getElement(), this._loadMoreButton.getElement(), RenderPosition.BEFOREEND);
      const onShowMoreTasksButtonClick = () => {
        let tasksToShow = RENDER_COUNT - visibleTasks;
        visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
        taskListElement.innerHTML = ``;
        array.slice(0, visibleTasks).forEach((task) => renderTask(taskListElement, task));
        if (visibleTasks === RENDER_COUNT) {
          remove(this._loadMoreButton);
        }
      };
      this._loadMoreButton.setClickHandler(onShowMoreTasksButtonClick);
    };

    checkTasksStatus(tasks);
    tasks.slice(0, visibleTasks).forEach((task) => renderTask(taskListElement, task));
    renderLoadMoreButton(tasks);


    this._sort.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];
      switch (sortType) {
        case SortType.DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          sortedTasks = tasks.slice();
          break;
      }
      remove(this._loadMoreButton);
      taskListElement.innerHTML = ``;
      visibleTasks = 8;
      renderTasks(taskListElement, sortedTasks.slice(0, visibleTasks));
      renderLoadMoreButton(sortedTasks);
    });
  }
}

