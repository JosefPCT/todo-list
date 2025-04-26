export class ProjectController{
    #projects = [];
    constructor(){
        
    }

    addProjectToList(project){
        this.#projects.push(project);
    }

    displayProjects(){
        console.log(this.#projects);
    }
}