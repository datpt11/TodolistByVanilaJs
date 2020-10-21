import todoForm from "./components/todoForm/todoForm";
import "./app.scss";
const app = () => {
  return `
  ${todoForm({ buttonText: "Add" })}
  <div class="panel">
    <div class="panel__heading">
      <h3>Status</h3>
      <h3>Name of task</h3>
      <h3>Action</h3>
    </div>
    <div class="panel__body">
      <ul class="todo__list"></ul>
    </div>
  </div>
  `;
};

export default app;
