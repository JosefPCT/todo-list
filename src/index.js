import "./styles.css";
import { roar } from './test.js'
import { Todo } from './todo.js'
import { Project } from './project.js'
import { ProjectController } from './projectcontroller.js'


class MainController{
    constructor(){
        ProjectController.addProjectToList(new Project("Default"));
    }

    createProject(name){
        const proj = new Project(name);
        ProjectController.addProjectToList(proj);
    }

    // Takes in name, description, due date, priority, notes, checklist and optional project paramater
    createTodo(name,desc,dueDate,prio,notes,checklist,project="Default"){
        // Looks for the project it will go into
        const proj = ProjectController.getProject(project);
        const newTodo = new Todo(name,desc,dueDate,prio,notes,checklist);
        proj.addTodo(newTodo);
    }

    // Console logs the todo list of a specific project
    displayTodosOf(projName){
        console.log(`Displaying todos of ${projName}`);
        const proj = ProjectController.getProject(projName);
        proj.showTodos();
    }

    //
    findTodoOf(projName,title){
        const proj = ProjectController.getProject(projName);
        return proj.getTodo(title);
    }

    deleteTodoOf(projName, title){
        const proj = ProjectController.getProject(projName);
        proj.deleteTodo(title);
    }
}

const mc = new MainController;
mc.createProject("testing");

mc.createTodo("Test name", "test description lorem ipsum", "April 11", "High priority");
mc.createTodo("Aall", "test description lorem ipsum", "April 11", "High priority","test note","test checklist","testing");

console.log(ProjectController.displayProjects());
const testy = ProjectController.getProject("Default");
console.log(testy);
console.log(testy.todoLists[0].isCompleted);
testy.todoLists[0].toggleCompleteStatus();
console.log(testy.todoLists[0].isCompleted);
testy.todoLists[0].setPriority("low");
console.log(testy.todoLists[0]);

console.log(ProjectController.displayProjects());
mc.displayTodosOf("Default");

// Finding a specific todo and editing it
console.log(testy);
console.log(mc.findTodoOf("Default", "Test name"));
console.log(mc.findTodoOf("testing", "Aall"));
const edit = mc.findTodoOf("testing", "Aall");

console.log("hmm");
console.log(edit);
edit.description = "Hmm";
console.log(edit);

// Deleting a todo
console.log("deleting");
console.log(ProjectController.displayProjects());
mc.deleteTodoOf("testing", "Aall");
console.log(ProjectController.displayProjects());

const newProj = ProjectController.getProject("testing");
console.log(newProj);

const newTodo = new Todo("Testing 3");
newProj.addTodo(newTodo);
ProjectController.displayProjects();