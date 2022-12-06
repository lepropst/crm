import { Todo } from "../todos/model";

export class TodoList {
  public id: number;
  public label: string;
  public todos: Todo[];
  constructor(_id: number, _label: string, _todos: Todo[]) {
    this.id = _id;
    this.label = _label;
    this.todos = _todos;
  }
  public static fromResponse(m: Map<string, any>) {
    const id = m.get("id");
    const label = m.get("label");
    const todos = m.get("todos");
    return new TodoList(id, label, todos);
  }
}
