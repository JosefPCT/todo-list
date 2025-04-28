import "./styles.css";
import { roar } from './test.js'
import { ScreenController } from './screencontroller.js'



// class MainController{
//     constructor(){
//         ProjectController.addProjectToList(new Project("Default"));
//         ProjectController.addProjectToList(new Project("Test"));
//         ScreenController.cacheDom();
//         ScreenController.initEventListeners();
//         // Testing...
//         console.log("testing,...");
//         console.log(ScreenController.container);
//         ScreenController.showProjects(ProjectController.getListOfProjects());
//     }
// }
// const mc = new MainController;
// ProjectController.createProject("testing");
// mc.createTodo("Aall", "test description lorem ipsum", "April 11", "High priority","test note","test checklist","testing");
// console.log(ProjectController.getListOfProjects());

// mc.createTodo("Test name", "test description lorem ipsum", "April 11", "High priority");


// console.log(ProjectController.displayProjects());
// const testy = ProjectController.getProject("Default");
// console.log(testy);
// console.log(testy.todoLists[0].isCompleted);
// testy.todoLists[0].toggleCompleteStatus();
// console.log(testy.todoLists[0].isCompleted);
// testy.todoLists[0].setPriority("low");
// console.log(testy.todoLists[0]);

// console.log(ProjectController.displayProjects());
// mc.displayTodosOf("Default");

// // Finding a specific todo and editing it
// console.log(testy);
// console.log(mc.findTodoOf("Default", "Test name"));
// console.log(mc.findTodoOf("testing", "Aall"));
// const edit = mc.findTodoOf("testing", "Aall");

// console.log("hmm");
// console.log(edit);
// edit.description = "Hmm";
// console.log(edit);

// // Deleting a todo
// console.log("deleting");
// console.log(ProjectController.displayProjects());
// mc.deleteTodoOf("testing", "Aall");
// console.log(ProjectController.displayProjects());

// const newProj = ProjectController.getProject("testing");
// console.log(newProj);

// const newTodo = new Todo("Testing 3");
// newProj.addTodo(newTodo);
// ProjectController.displayProjects();

// // testing get project name and get to do list methods
// console.log(newProj.getProjectName());
// console.log(newProj.getTodoList());

// // Testing Screen Controller
