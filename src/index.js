import "./styles.css";
import { roar } from './test.js'
import { Todo } from './todo.js'
import { Project } from './project.js'
import { ProjectController } from './projectcontroller.js'

const testProject = new Project("Default");
const projectcontroller = new ProjectController;
const todo = new Todo("Test name", "test description lorem ipsum", "April 11", "High priority");

testProject.addTodo(todo);

projectcontroller.addProjectToList(testProject);

projectcontroller.displayProjects();

const todo2 = new Todo("Test name2", "test description lorem ipsum2", "April 112", "High priority2");

testProject.addTodo(todo2);

projectcontroller.createProject("test project");
projectcontroller.displayProjects();



// console.log(testProject);

// console.log(todo);
// console.log(todo.displayDetails());

// testProject.addTodo(todo);
// console.log(testProject);
// console.log(roar);
