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
        return newTodo;
    }
 
    // Returns a specific todo
    static getTodoOf(projName,title){
         const proj = LogicController.getProject(projName);
         return proj.getTodo(title);
     }

    static deleteTodoOf(projName, title){
        const proj = LogicController.getProject(projName);
        proj.deleteTodo(title);
    }     

    //Project-Related Methods
    // Remove project from the #projects array
    static removeProjectFromList(projName){
        LogicController.#projects = LogicController.#projects.filter((proj) => proj.name !== projName);
    }

    // Replace list of projects, takes an array as an argument;
    // To use with localStorage JSON parsing
    static replaceListOfProjects(projects){
        LogicController.#projects = projects;
    }

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
        return proj;
    }

    static renameProject(projName,newName){
        const proj = LogicController.getProject(projName);
        return proj.name = newName;
    }

    static addProjectToList(project){
        LogicController.#projects.push(project);
    }
    
    // JSON Local Storage Serialization and Parsing

    // Stores all the current projects on the localStorage when unload event fires
    static storeProjectsToJSON(){
        console.log("unloading...");
        const projects = LogicController.getListOfProjects();
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    // Parse the localStorage's project JSON file 
    static parseProjectsFromJSON(){
        console.log("Parsing projects JSON...");
        const projects = JSON.parse(localStorage.getItem("projects"));
    
        const projectsWithMethods = [];
        projects.forEach( (proj,projInd) =>{
            console.log(proj.name);
            const newProjInstance = new Project();
            Object.assign(newProjInstance, proj);
            projectsWithMethods.push(newProjInstance);
            proj.todoLists.forEach((todo,todoInd) => {
                const newTodoInstance = new Todo();
                console.log(todo.title);
                Object.assign(newTodoInstance, todo);
                projectsWithMethods[projInd].todoLists[todoInd] = newTodoInstance;
            });
        });
        console.log(projectsWithMethods);
        LogicController.replaceListOfProjects(projectsWithMethods);       
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