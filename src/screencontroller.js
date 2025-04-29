import { LogicController } from './logic-controller.js'

export class ScreenController{
    static container;
    static addTodoButton;
    static addProjectButton;
    static modal;
    static whoClicked;
    constructor(){
        // this.cacheDom();
    }

    static cacheDom(){
        ScreenController.container = document.getElementById("main-container");
        ScreenController.addTodoButton = document.getElementById("add-todo");
        ScreenController.addProjectButton = document.getElementById("add-project");
        ScreenController.modal = document.getElementById("new-todo-dialog");
        ScreenController.modalSubmitButton = document.getElementById("add-todo-modal-submit");
        ScreenController.form = document.getElementById("new-todo-form");
    }

    static initEventListeners(){
        console.log("Initializing event listeners");
        ScreenController.addProjectButton.addEventListener("click", ScreenController.newProject);
        ScreenController.addTodoButton.addEventListener("click", ScreenController.openModal);
        ScreenController.modalSubmitButton.addEventListener("click", ScreenController.modalNewTodo);
    }

    // Event handler for Adding a Project Button
    static newProject(e){
        console.log("Clicked addProject Button");
        const newProjectName = prompt("Name of new Project");
        LogicController.createProject(newProjectName);
        ScreenController.showAllProjects();
    }

    // Event handler for opening the modal, saves the id of the project where the button was clicked to
    static openModal(e){
        console.log("Who clicked?");
        console.log(e.target.previousSibling.id);
        ScreenController.whoClicked = e.target.previousSibling.id;
        console.log("Clicked New Todo Button");
        console.log(ScreenController.modal);
        ScreenController.modal.showModal();
        ScreenController.form.reset();
        
    }
    // Event handler for Adding a New Todo, uses FormData to get the form from the modal
    static modalNewTodo(e){
        console.log("Who clicked?");
        console.log(ScreenController.whoClicked);;
        console.log("Submitted New Todo");
        const form = ScreenController.form;
        
        const formData = new FormData(form);
        console.log(formData);
        // for(let [name, value] of formData){
        //     console.log(`${name} = ${value}`);
        // };
        const title = formData.get("title");
        const desc = formData.get("description");
        const due = formData.get("due-date");
        const prio = formData.get("priority");
        const notes = formData.get("notes");
        const checkList = "";
        const project = ScreenController.whoClicked === undefined ? "Default" : ScreenController.whoClicked;
        LogicController.createTodo(title,desc,due,prio,notes,checkList,project);
        ScreenController.showAllProjects();

    }

    // Clears the container first, then displays the project name and their todo's title and due date
    static showAllProjects(){
        ScreenController.container.innerHTML = "";
        const projects = LogicController.getListOfProjects();
        projects.forEach(project => {
            const div = document.createElement("div");
            const h2 = document.createElement("h2");
            const button = document.createElement("button");

            // uses the same modal for both add todo button
            button.addEventListener("click", ScreenController.openModal);
            button.textContent = "+";

            h2.id = project.name; 
            h2.textContent = project.name;
            h2.addEventListener("click", ScreenController.renameProjectHandler);

            div.appendChild(h2);
            div.appendChild(button);
            console.log(project);
            project.getTodoList().forEach(todo =>{
                const para = document.createElement("p");
                para.textContent = `${todo.title} due date on ${todo.dueDate}`;
                div.appendChild(para);
            });

            ScreenController.container.appendChild(div);
        });
    }

    // Event handler for renaming the project
    static renameProjectHandler(e){
        console.log("Initializing renaming of project...");
        console.log(e.target.id);
        const projName = e.target.id;

        const newProjectName = prompt("Rename the project", e.target.id);

        LogicController.renameProject(projName, newProjectName);
        ScreenController.showAllProjects();
        console.log(`Renamed project to ${newProjectName}`);
    }
}

window.onload = function(){
    ScreenController.cacheDom();
    ScreenController.initEventListeners();

    LogicController.createProject("Default");
    LogicController.displayProjects();

    ScreenController.showAllProjects();
}

