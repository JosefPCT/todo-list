export class ProjectController{
    static #projects = [];
    constructor(){     
    }

    static addProjectToList(project){
        this.#projects.push(project);
    }

    // Returns an element if found, returns undefined if not found
    static getProject(projectName){
        return this.#projects.find((item) => item.name === projectName);
    }

    static getListOfProjects(){
        return this.#projects;
    }

    // For console
    static displayProjects(){
        console.log("Displaying projects...");
        console.log(this.#projects);
    }
}
