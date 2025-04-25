export class Todo{
    constructor(title,description,dueDate,priority,notes,checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    displayDetails(){
        console.log(`This todo is titled ${this.title} and has a description of ${this.description}, Due date on: ${this.dueDate}, has a priority of ${this.priority}.`);
        console.log(`Also has notes of ${this.notes} and a checklist of ${this.checklist}`);
    }
}