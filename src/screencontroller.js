import { LogicController } from './logic-controller.js'

export class ScreenController{
    static container;
    static addTodoButton;
    static addProjectButton;
    constructor(){
        // this.cacheDom();
    }

    static cacheDom(){
        ScreenController.container = document.getElementById("main-container");
        ScreenController.addTodoButton = document.getElementById("add-todo");
        ScreenController.addProjectButton = document.getElementById("add-project");
    }

    static initEventListeners(){
        console.log("Initializing event listeners");
        ScreenController.addProjectButton.addEventListener("click", ScreenController.newProject);
        ScreenController.addTodoButton.addEventListener("click", ScreenController.newTodo);
    }

    // Event handler for Adding a Project Button
    static newProject(e){
        console.log("Clicked addProject Button");
        const newProjectName = prompt("Name of new Project");
        LogicController.createProject(newProjectName);
        ScreenController.showAllProjects();
    }

    // Event handler for Adding a New Todo Button
    static newTodo(e){
        console.log("Clicked New Todo Button");
        const newTodo = prompt("Name of new Todo");
        LogicController.createTodo(newTodo);
        ScreenController.showAllProjects();
    }

    // Clears the container first, then displays the project name and their todo's title and due date
    static showAllProjects(){
        ScreenController.container.innerHTML = "";
        const projects = LogicController.getListOfProjects();
        projects.forEach(project => {
            const div = document.createElement("div");
            const h2 = document.createElement("h2");
            h2.textContent = project.name;

            div.appendChild(h2);
            console.log(project);
            project.getTodoList().forEach(todo =>{
                const para = document.createElement("p");
                para.textContent = `${todo.title} due date on ${todo.dueDate}`;
                div.appendChild(para);
            });

            ScreenController.container.appendChild(div);
        });
    }
}

window.onload = function(){
    ScreenController.cacheDom();
    ScreenController.initEventListeners();

    LogicController.createProject("Default");
    LogicController.displayProjects();

    ScreenController.showAllProjects();
}

