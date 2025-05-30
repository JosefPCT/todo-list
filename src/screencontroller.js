import { LogicController } from './logic-controller.js'
import { Todo } from './todo.js';
import { Project } from './project.js'
import { format } from "date-fns";
import { secondsToHours } from 'date-fns';

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
        console.log(e.target.parentNode.id);
        ScreenController.whoClicked = e.target.parentNode.id;
        console.log("Clicked New Todo Button");
        console.log(ScreenController.modal);
        ScreenController.modal.showModal();
        ScreenController.form.reset();
        
    }
    // Event handler for Adding a New Todo, uses FormData to get the form from the modal
    static modalNewTodo(e){
        console.log("Who clicked?");
        console.log( "" === ScreenController.whoClicked);;
        console.log("Submitted New Todo");
        const form = ScreenController.form;
        
        const formData = new FormData(form);
        console.log(formData);
        const title = formData.get("title");
        const desc = formData.get("description");
        const due = formData.get("due-date");
        const prio = formData.get("priority");
        const notes = formData.get("notes");
        const checkList = "";
        const project = ScreenController.whoClicked === "" ? "Default" : ScreenController.whoClicked;
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
            const removeProjButton = document.createElement("button");
            

            div.id = project.name; 

            h2.textContent = project.name;
            h2.addEventListener("click", ScreenController.renameProjectHandler);

            // uses the same modal for both add todo button
            button.addEventListener("click", ScreenController.openModal);
            button.textContent = "+";


            div.appendChild(h2);
            div.appendChild(button);
            if(project.name !== "Default"){
                removeProjButton.addEventListener("click", ScreenController.removeProjectHandler);
                removeProjButton.textContent = "Remove Project";
                div.appendChild(removeProjButton);
            }

            
            console.log(project);
            project.getTodoList().forEach(todo =>{
                const para = document.createElement("p");
                const todoDiv = document.createElement("div");

                todoDiv.classList.add("todo-container");
                
                para.addEventListener("click", ScreenController.expandTodoHandler);

                para.textContent = `${todo.title} due date on ${todo.dueDate}`;
                para.setAttribute('data-title',todo.title);

                todoDiv.appendChild(para);
                div.appendChild(todoDiv);
            });

            ScreenController.container.appendChild(div);
        });
    }

    // Event handler for removing proejcts
    static removeProjectHandler(e){
        console.log("Initializing remove project handler");
        console.log(e.target.parentNode);
        LogicController.removeProjectFromList(e.target.parentNode.id);
        ScreenController.showAllProjects();
    }

    // Event handler for removing todos
    static removeTodoHandler(e){
        console.log("Removing todo...");
        console.log(e.target.parentNode);
        const todoTitle = e.target.parentNode.previousSibling.dataset.title;
        const projName = e.target.parentNode.parentNode.parentNode.id;
        console.log(todoTitle);
        console.log(projName);
        LogicController.deleteTodoOf(projName,todoTitle);
        ScreenController.showAllProjects();
        const nodeToRemove = e.target.parentNode;
        const parentOfNode = e.target.parentNode.parentOfNode;
    }

    // Event handler for expanding todos
    static expandTodoHandler(e){
        console.log("Initializing expanding of todo");
        console.log("Getting the project name...");
        const projName = e.target.parentNode.parentNode.id;
        console.log(projName);

        console.log("Showing nextSibling");
        console.log(e.target.nextSibling);

        // Block of code that checks if a sibling exists, if not, expand, if it does remove the next sibling
        if(e.target.nextSibling){
            console.log("already expanded...");
            console.log(e.target.nextSibling);
            const childToRemove = e.target.nextSibling;
            const parent = e.target.parentNode;
            parent.removeChild(childToRemove);
            return;
        } else {
            const todoTitle = e.target.dataset.title;
            console.log(`Data title value is: ${todoTitle}`);
    
            const todo = LogicController.getTodoOf(projName,todoTitle);
            console.log("Showing the specific todo:");
            console.log(todo);
    
            const expandedTodoDiv = document.createElement("div");
            const removeTodoButton = document.createElement("button");

            removeTodoButton.addEventListener("click", ScreenController.removeTodoHandler);
            removeTodoButton.textContent = `Complete`;

            expandedTodoDiv.classList.add("expanded-todo");
    
            for ( const prop in todo){
                console.log(`${prop}: ${todo[prop]}`);
                const para = document.createElement("p");
                para.textContent = `${prop}: ${todo[prop]}`;
                expandedTodoDiv.appendChild(para);
            }
            
            expandedTodoDiv.appendChild(removeTodoButton);
            e.target.parentNode.appendChild(expandedTodoDiv);
            
        }

    }

    // Event handler for renaming the project
    static renameProjectHandler(e){
        console.log("Initializing renaming of project...");
        console.log(e.target.parentNode.id);
        const projName = e.target.parentNode.id;

        const newProjectName = prompt("Rename the project", e.target.parentNode.id);

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


    LogicController.parseProjectsFromJSON();
    ScreenController.showAllProjects();
}


window.onunload = function(){
    LogicController.storeProjectsToJSON();
}
