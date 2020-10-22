import todoItem from "../todoItem/todoItem";
import { v4 as uuidv4 } from "uuid";
class TodoList {
  /**
   *
   * @param {{
   *  items: Array,
   * }} options
   */
  constructor(options = {}) {
    const defaultOptions = {
      items: [],
    };
    this.inputEl = document.querySelector(".todo__input");
    this.btnAddEl = document.querySelector(".btn__submit");
    this.todoListEl = document.querySelector(".todo__list");
    this.btnClearInput = document.querySelector(".btn__clearInput");
    this.panel = document.querySelector(".panel");
    this.options = { ...defaultOptions, ...options };
    this.items = [];
    this.isEdit = false;
    this.isComplete = false;
    this.createAt = "";
    this.updateAt = "";
    this.id = "";
    this._init();
  }
  _renderPanel() {
    console.log(this.items.length);
    this.panel.style.visibility = this.items.length > 0 ? "visible" : "hidden";
  }
  _renderTodoList() {
    let content = this.items.map((item) => {
      return `
        ${todoItem(item)}
      `;
    });
    this.todoListEl.innerHTML = content.join("");
  }
  // handleChangeValue
  getValueInput = () => {
    this.value = this.inputEl.value;
  };
  //handleSubmit
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.isEdit);
    const currentTime = new Date();
    this.btnAddEl.textContent = "Add";
    this.getValueInput();
    if (this.isEdit) {
      this.updateAt = currentTime;
      const editTask = {
        id: this.id,
        name: this.value,
        isComplete: this.isComplete,
        createAt: this.createAt,
        updateAt: this.updateAt,
      };
      const index = this.items.findIndex((item) => item.id === this.id);
      this.items[index] = editTask;
      this.isEdit = false;
      this.handleClearInput();
    } else {
      this.createAt = currentTime;
      const newTask = {
        id: uuidv4(),
        name: this.value,
        isComplete: this.isComplete,
        createAt: this.createAt,
        updateAt: this.updateAt,
      };
      this.items.push(newTask);
      this.isEdit = false;
      this.handleClearInput();
      this._renderPanel();
    }

    this._update();
  };
  //handleDelete
  /**
   *
   * @param {{
    id: string
   }} id
   */
  handleDelete = (id) => {
    if (confirm("are you sure")) {
      const filterItems = this.items.filter((item) => {
        return item.id !== id;
      });
      this.items = filterItems;
      this._update();
      this._renderPanel();
    }
  };
  // handle Edit
  /**
   *
   * @param {{
   *  id: string
   *
   * }} id
   */
  handleEdit = (id) => {
    this.displayBtnClearInput();
    this.btnAddEl.textContent = "Update";
    const selectedItem = this.items.find((item) => {
      return item.id === id;
    });
    this.isEdit = true;
    this.id = id;
    this.inputEl.value = selectedItem.name;
    this.inputEl.focus();
  };
  /**
   *
   * @param {{
   *   currentNode: EventTarget
   *
   * }} currentNode
   * @param {{
   *  id: string
   * }} id
   */
  handleSelect = (currentNode, id) => {
    const selectedItem = this.items.find((item) => {
      return item.id === id;
    });
    selectedItem.isComplete = !selectedItem.isComplete;
    if (currentNode.classList.contains("checked")) {
      currentNode.classList.remove("checked");
    } else {
      currentNode.classList.add("checked");
    }
    this._update();
  };
  displayBtnClearInput() {
    this.btnClearInput.style.visibility = this.inputEl.value
      ? "visible"
      : "hidden";
  }
  handleClearInput() {
    this.inputEl.value = "";
    this.btnClearInput.style.visibility = "hidden";
  }
  _update() {
    this._renderTodoList();
  }

  _init() {
    this._renderTodoList();
    this.btnAddEl.addEventListener("click", this.handleSubmit.bind(this));
    this.todoListEl.addEventListener("click", (e) => {
      const currentNode = e.target;
      if (currentNode.classList.contains("btn__delete")) {
        const dataId = currentNode.getAttribute("data-id");
        currentNode.addEventListener("click", this.handleDelete(dataId));
      }
    });
    this.todoListEl.addEventListener("click", (e) => {
      const currentNode = e.target;
      if (currentNode.classList.contains("btn__edit")) {
        const dataId = currentNode.getAttribute("data-id");
        currentNode.addEventListener("click", this.handleEdit(dataId));
      }
    });
    this.todoListEl.addEventListener("click", (e) => {
      const currentNode = e.target;
      if (currentNode.classList.contains("checkbox")) {
        const dataId = currentNode.getAttribute("data-id");
        currentNode.addEventListener(
          "click",
          this.handleSelect(currentNode, dataId)
        );
      }
    });
    this.inputEl.addEventListener(
      "keyup",
      this.displayBtnClearInput.bind(this)
    );
    this.btnClearInput.addEventListener(
      "click",
      this.handleClearInput.bind(this)
    );
  }
}
export default TodoList;
