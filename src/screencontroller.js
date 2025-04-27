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

    static showProjects(projects){

    }
}