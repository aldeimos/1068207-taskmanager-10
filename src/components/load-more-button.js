import AbstractComponent from "./abstract-component";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
  removeClickHandler(handler) {
    this.getElement().removeEventListener(`click`, handler);
  }
}
