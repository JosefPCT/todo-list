import "./styles.css";
import { roar } from './test.js'
import { Todo } from './todo.js'

const todo = new Todo("Test name", "test description lorem ipsum", "April 11", "High priority");

console.log(todo);
console.log(todo.displayDetails());

console.log(roar);
