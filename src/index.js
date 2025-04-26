import "./styles.css";
import { roar } from './test.js'
import { Todo } from './todo.js'
import { Project } from './project.js'
import { ProjectController } from './projectcontroller.js'

// const testProject = new Project("Default");
// const projectcontroller = new ProjectController;
// const todo = new Todo("Test name", "test description lorem ipsum", "April 11", "High priority");
// const todo2 = new Todo("Test name2", "test description lorem ipsum2", "April 112", "High priority2");

// testProject.addTodo(todo);
// projectcontroller.addProjectToList(testProject);
// projectcontroller.displayProjects();
// testProject.addTodo(todo2);
// projectcontroller.createProject("test project");
// projectcontroller.displayProjects();
// const search = projectcontroller.getProject("test project");
// // console.log(search);
// search.addTodo(todo);
// projectcontroller.displayProjects();

// // console.log(testProject);

// // console.log(todo);
// // console.log(todo.displayDetails());

// // testProject.addTodo(todo);
// // console.log(testProject);
// // console.log(roar);

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
