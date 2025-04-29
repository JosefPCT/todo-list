import { Todo } from './todo.js'
import { Project } from './project.js'

export class LogicController{
    static #projects = [];

    // Todo-Related Methods
    // Takes in name, description, due date, priority, notes, checklist and optional project paramater
    static createTodo(name,desc,dueDate,prio,notes,checklist,project="Default"){
        // Looks for the project it will go into
        const proj = LogicController.getProject(project);
        const newTodo = new Todo(name,desc,dueDate,prio,notes,checklist);
        proj.addTodo(newTodo);
    }
 
    // Returns a specific todo
    static findTodoOf(projName,title){
         const proj = LogicController.getProject(projName);
         return proj.getTodo(title);
     }

    static deleteTodoOf(projName, title){
        const proj = ProjectController.getProject(projName);
        proj.deleteTodo(title);
    }     

    //Project-Related Methods
    // returns the current list of projects
    static getListOfProjects(){
        return LogicController.#projects;
    }

     // Returns a specific project if found, undefined if not found
     static getProject(projectName){
        return LogicController.#projects.find((item) => item.name === projectName);
    }   

    static createProject(name){
        const proj = new Project(name);
        LogicController.addProjectToList(proj);
    }

    static renameProject(projName,newName){
        const proj = LogicController.getProject(projName);
        return proj.name = newName;
    }

    static addProjectToList(project){
        LogicController.#projects.push(project);
    }

    // Console Related Methods
    static displayProjects(){
        console.log("Displaying projects...");
        console.log(LogicController.#projects);
    }

     // Console logs the todo list of a specific project
     static displayTodosOf(projName){
        console.log(`Displaying todos of ${projName}`);
        const proj = LogicController.getProject(projName);
        proj.showTodos();
    }  
    
    
}