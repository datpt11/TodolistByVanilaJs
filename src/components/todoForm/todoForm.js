import button from "../button/button";
import todoInput from "../todoInput/todoInput";
import './todoForm.scss';

const formTodo = ({ buttonText }) => {
  return `
    <form class="todo__form">
      ${todoInput()}
      ${button({ text: buttonText, size: "large", color: "primary", type: "submit", classCustom: 'btn__submit'})}
    </form>
  `;
};

export default formTodo;
