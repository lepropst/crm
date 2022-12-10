import { Todo } from "../todos/model";

export class TodoList {
  public id?: number;
  public label: string;
  public todos: Todo[];
  public owner: string;
  constructor(_label: string, _todos: Todo[], _owner: string, _id?: number) {
    this.id = _id;
    this.label = _label;
    this.todos = _todos.map((e) => Todo.fromTodo(e));
    this.owner = _owner;
  }
  public static fromTodoList(tl: TodoList) {
    return new TodoList(tl.label, tl.todos, tl.owner, tl.id);
  }
}
