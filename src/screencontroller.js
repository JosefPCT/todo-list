import { LogicController } from './logic-controller.js'
import { Todo } from './todo.js';
import { Project } from './project.js'

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
        // for(let [name, value] of formData){
        //     console.log(`${name} = ${value}`);
        // };
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

            div.id = project.name; 

            h2.textContent = project.name;
            h2.addEventListener("click", ScreenController.renameProjectHandler);

            // uses the same modal for both add todo button
            button.addEventListener("click", ScreenController.openModal);
            button.textContent = "+";

            div.appendChild(h2);
            div.appendChild(button);
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
            expandedTodoDiv.classList.add("expanded-todo");
    
            for ( const prop in todo){
                console.log(`${prop}: ${todo[prop]}`);
                const para = document.createElement("p");
                para.textContent = `${prop}: ${todo[prop]}`;
                expandedTodoDiv.appendChild(para);
            }
    
            // console.log(e.target.parentNode);
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

    //Testing of local storage
    // const test0 = localStorage.setItem("todo", JSON.stringify(new Todo("name")));
    // console.log(test0);
    // console.log()
    // const test = localStorage.getItem("test key");
    // console.log(test);
    // const test2 = localStorage.removeItem("test key");
    // console.log(test2);

    // //More Testing, creating a localStorage item to set
    // const testProject = LogicController.createProject("test proj");
    // const testTodo = LogicController.createTodo("Test title","test desc","12-25","high","test notes","test checklist");
    // console.log(testProject);
    // console.log(testTodo);
    // testProject.addTodo(testTodo);
    // localStorage.setItem("1",JSON.stringify(testProject));

    // Parse the localStorage's project JSON file 
    const projects = JSON.parse(localStorage.getItem("projects"));



    // // Code to restore objects form JSON file, check for null
    // const test = localStorage.getItem("1");
    // const testParsed = JSON.parse(test);
    // console.log(testParsed);
    // console.log(testParsed.todoLists);

    // const todoInstance = new Todo();
    // const projectInstance = new Project();
    // Object.assign(todoInstance, testParsed.todoLists[0]);
    // console.log(testParsed);
    // console.log(todoInstance);
    // testParsed.todoLists[0] = todoInstance;
    // console.log(testParsed);

    // console.log(projectInstance);
    // Object.assign(projectInstance,testParsed);
    // console.log(projectInstance);
    // LogicController.addProjectToList(projectInstance);
    // ScreenController.showAllProjects();

    // // A project object that contains all the project in the localStorage
    // console.log("list of projects");
    // console.log(LogicController.getListOfProjects());       
    // localStorage.setItem("projects", JSON.stringify(LogicController.getListOfProjects()));
    // const x = JSON.parse(localStorage.getItem("projects"));
    // console.log(x);
}

// Stores all the current projects on the localStorage when unload event fires
window.onunload = function(){
    console.log("unloading...");
    const projects = LogicController.getListOfProjects();
    localStorage.setItem("projects", JSON.stringify(projects));
}
