import "./styles.css";
import app from "./app";
import TodoList from './components/TodoList/TodoList';
import data from '../data'

document.getElementById("app").innerHTML = app();

new TodoList({
  items: data
});