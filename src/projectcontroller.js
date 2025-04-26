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
}