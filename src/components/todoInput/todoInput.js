import "./todoInput.scss";

const todoInput = () => {
  return `
  <div class="input-wrap">
    <input type="text" class="todo__input" />
    <span class="btn__clearInput" title="Clear">&times;</span>
  </div>
  `;
};
export default todoInput;
