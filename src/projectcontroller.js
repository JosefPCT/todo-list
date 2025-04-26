import { Project } from './project.js'

export class ProjectController{
    #projects = [];
    constructor(){
        
    }

    createProject(name){
        const project = new Project(name);
        this.addProjectToList(project);
    }

    addProjectToList(project){
        this.#projects.push(project);
    }

    displayProjects(){
        console.log(this.#projects);
    }

    // Returns an element if found, returns undefined if not found
    searchProject(projectName){
        return this.#projects.find((item) => item.name === projectName);
    }
}