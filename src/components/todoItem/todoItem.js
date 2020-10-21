import button from "../button/button";
import "./todoItem.scss";

const todoItem = (item, index) => {
  return `
    <li class="todo__item">
      <div class="todo__checkbox">
        <button data-id=${item.id} class="checkbox ${
    item.isComplete ? "checked" : ""
  }"></button>
      </div>
      <div class="todo__task">
        <p class=${item.isComplete ? "todo--complete" : ""}>${item.name}</p>
      </div>
      <div class="todo__action">
        ${button({
          text: "Edit",
          color: "secondary",
          classCustom: "btn__edit",
          dataId: item.id,
        })}
        ${button({
          text: "Delete",
          color: "third",
          classCustom: "btn__delete",
          dataId: item.id,
        })}
      </div>
    </li>
  `;
};

export default todoItem;
