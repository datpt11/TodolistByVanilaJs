import todoItem from "../todoItem/todoItem";
import { v4 as uuidv4 } from "uuid";
class TodoList {
  /**
   *
   * @param {{
   *  items: Array,
   *  isEdit: boolean,
   *  value: string,
   *  id: '',
   *  createAt: '',
   *  updateAt: '',
   *  isComplete: boolean
   * }} options
   */
  constructor(options = {}) {
    const defaultOptions = {
      items: [],
      isEdit: false,
      value: "",
      id: "",
      isComplete: false,
      createAt: "",
      updateAt: "",
    };
    this.inputEl = document.querySelector(".todo__input");
    this.btnAddEl = document.querySelector(".btn__submit");
    this.todoListEl = document.querySelector(".todo__list");
    this.options = { ...defaultOptions, ...options };
    this._init();
  }
  _renderTodoList() {
    const { items } = this.options;
    let content = items.map((item) => {
      return `
        ${todoItem(item)}
      `;
    });
    this.todoListEl.innerHTML = content.join("");
  }
  // handleChangeValue
  getValueInput = () => {
    this.options.value = this.inputEl.value;
  };
  //handleSubmit
  handleSubmit = (e) => {
    e.preventDefault();
    this.btnAddEl.textContent = "Add";
    const currentTime = new Date();
    this.getValueInput();
    const { isEdit, items, value } = this.options;
    this.options.createAt = currentTime;
    isEdit === false ? (this.options.id = uuidv4()) : this.options.id;
    isEdit === true ? (this.options.updateAt = currentTime) : "";
    const newTask = {
      id: this.options.id,
      name: value,
      isComplete: this.options.isComplete,
      createAt: this.options.createAt,
      updateAt: this.options.updateAt,
    };
    items.push(newTask);
    this.inputEl.value = "";
    this._update();
    console.log(items);
  };
  //handleDelete
  /**
   *
   * @param {{
    id: string
   }} id
   */
  handleDelete = (id) => {
    const { items } = this.options;
    const filterItems = items.filter((item) => {
      return item.id !== id;
    });
    this.options.items = filterItems;
    this._update();
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
    this.options.isEdit = true;
    this.btnAddEl.textContent = "Update";
    const { items } = this.options;
    const filterItems = items.filter((item) => {
      return item.id !== id;
    });
    this.options.items = filterItems;
    this._update();
    const selectedItem = items.find((item) => {
      return item.id === id;
    });
    this.inputEl.value = selectedItem.name;
    this.options.id = id;
    console.log(items);
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
    const selectedItem = this.options.items.find((item) => {
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
  }
}
export default TodoList;
