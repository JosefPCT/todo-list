export class ProjectController{
    static #projects = [];
    constructor(){     
    }

    static addProjectToList(project){
        this.#projects.push(project);
    }

    static displayProjects(){
        console.log("Displaying projects...");
        console.log(this.#projects);
    }

    // Returns an element if found, returns undefined if not found
    static getProject(projectName){
        return this.#projects.find((item) => item.name === projectName);
    }

    // Console logs the todo list of a specific project
    static displayTodosOf(projName){
        console.log(`Displaying todos of ${projName}`);
        const proj = this.getProject(projName);
        proj.showTodos();
    }
}