import {createElement} from '../utils/render.js';
export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Не могу создать экземпляр AbstractComponent`);
    }
    this._element = null;
  }
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
