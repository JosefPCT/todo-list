export class Project{
    constructor(name){
        this.name = name;
        this.todoLists = [];
    }

    addTodo(todo){
        this.todoLists.push(todo);
    }

    displayDetails(){
        console.log(`This project has the name of ${this.name}`);
        console.log(`This project's todo's are ${this.todoLists}`); 
    }
}