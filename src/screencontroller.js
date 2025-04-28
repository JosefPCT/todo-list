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
    }

    // Event handler
    static newProject(e){
        console.log("Clicked addProject Button");
        const newProjectName = prompt("Name of new Project");
        LogicController.createProject(newProjectName);
        ScreenController.showAllProjects();
    }

    static showAllProjects(){
        ScreenController.container.innerHTML = "";
        const projects = LogicController.getListOfProjects();
        projects.forEach(project => {
            const h2 = document.createElement("h2");
            h2.textContent = project.name;
            ScreenController.container.appendChild(h2);
        });
    }
}

ScreenController.cacheDom();
ScreenController.initEventListeners();
LogicController.displayProjects();