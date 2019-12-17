import TaskComponent from '../components/task.js';
import AlertComponent from '../components/alert.js';
import LoadMoreButton from '../components/load-more-button.js';

import {
  RenderPosition,
  render,
  remove
} from '../utils/render.js';
import {
  Sort,
  SortType
} from '../components/sort.js';
import TaskController from './task.js';

const RENDER_COUNT = 22;
let visibleTasks = 8;

const renderTasks = (taskList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskList, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

export default class Board {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];

    this._sort = new Sort();
    this._alert = new AlertComponent();
    this._task = new TaskComponent();
    this._loadMoreButton = new LoadMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    const container = this._container;
    this._tasks = tasks;
    const taskListElement = container.getElement().querySelector(`.board__tasks`);
    render(this._container.getElement(), this._sort.getElement(), RenderPosition.AFTERBEGIN);

    /* const checkTasksStatus = (items) => {
      const status = items.every((it) => it.isArchive === true);
      if (status) {
        const alertComponent = this._alert.getElement();
        container.getElement().replaceChild(alertComponent, taskListElement);
        return;
      }
    }; */

    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, visibleTasks), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton(this._tasks);
    this.checkTasksStatus(this._tasks);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
    this.checkTasksStatus(this._tasks);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
  _renderLoadMoreButton(tasks) {
    if (visibleTasks >= this._tasks.length) {
      return;
    }
    render(this._container.getElement(), this._loadMoreButton.getElement(), RenderPosition.BEFOREEND);
    const onShowMoreTasksButtonClick = () => {
      let tasksToShow = RENDER_COUNT - visibleTasks;
      visibleTasks += tasksToShow > 8 ? 8 : tasksToShow;
      const taskListElement = this._container.getElement().querySelector(`.board__tasks`);
      taskListElement.innerHTML = ``;
      const newTasks = renderTasks(taskListElement, tasks.slice(0, visibleTasks), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
      if (visibleTasks === RENDER_COUNT) {
        remove(this._loadMoreButton);
      }
    };
    this._loadMoreButton.setClickHandler(onShowMoreTasksButtonClick);
  }
  _onSortTypeChange(sortType) {
    let sortedTasks = [];
    const taskListElement = this._container.getElement().querySelector(`.board__tasks`);
    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks.slice();
        break;
    }
    remove(this._loadMoreButton);
    taskListElement.innerHTML = ``;
    visibleTasks = 8;
    renderTasks(taskListElement, sortedTasks.slice(0, visibleTasks));
    this._renderLoadMoreButton(sortedTasks);
  }
  checkTasksStatus(items) {
    const status = items.every((it) => it.isArchive === true);
    if (status) {
      const alertComponent = this._alert.getElement();
      const taskListElement = this._container.getElement().querySelector(`.board__tasks`);
      this._container.getElement().replaceChild(alertComponent, taskListElement);
      remove(this._loadMoreButton);
      return;
    }
  }
}
