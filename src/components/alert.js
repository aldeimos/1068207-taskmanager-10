import AbstractComponent from "./abstract-component";

const createAlertTemplate = () => {
  return (
    `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>
  `
  );
};

export default class Alert extends AbstractComponent {
  getTemplate() {
    return createAlertTemplate();
  }
}
