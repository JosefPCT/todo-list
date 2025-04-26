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
ProjectController.displayTodosOf("Default");