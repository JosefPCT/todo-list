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

    showTodos(){
        this.todoLists.forEach(todo => {
            console.log(`Title: ${todo.title}`);
            console.log(`Due date: ${todo.dueDate}`);
            console.log(`Priority: ${todo.priority}`);
        });
    }

    getProjectName(){
        return this.name;
    }

    getTodo(title){
        const result = this.todoLists.find((item) => item.title === title);
        if(!result){
            console.log(`This todo does not exist`);
        } else {
            console.log(`Found ${title}`);
            console.log(result);
            return result;
        }
    }

    deleteTodo(title){
        console.log("deleting todo initializitng");
        const result = this.todoLists.find((todo) => todo.title === title ); 
        if(!result){
            console.log(`This todo does not exist`);
        } else{
            console.log(`Deleting todo now...`);
            this.todoLists.forEach((todo,ind) => {
                if(todo.title === title){
                    this.todoLists.splice(ind,1);
                }
            });
        } 
    }
}