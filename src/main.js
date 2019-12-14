import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import {generateTasks} from './mocks/task.js';
import {generateFilters} from './mocks/filter.js';
import {render, RenderPosition} from './utils/render.js';

const RENDER_COUNT = 22;
const tasks = generateTasks(RENDER_COUNT);
const filters = generateFilters(tasks);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const boardComponent = new BoardComponent();
render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
const boardController = new BoardController(boardComponent);

boardController.render(tasks);


