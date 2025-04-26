import "./styles.css";
import { roar } from './test.js'
import { Todo } from './todo.js'
import { Project } from './project.js'

const testProject = new Project("Default");
const listOfProjects = [testProject];



const todo = new Todo("Test name", "test description lorem ipsum", "April 11", "High priority");

console.log(testProject);

console.log(todo);
console.log(todo.displayDetails());

testProject.addTodo(todo);
console.log(testProject);
console.log(roar);
