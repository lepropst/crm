import { Todo } from "../todos/model";

export class TodoList {
  public label: string;
  public todos: Todo[];
  constructor(_label: string, _todos: Todo[]) {
    this.label = _label;
    this.todos = _todos;
  }
  public static fromResponse(m: Map<string, any>) {
    const label = m.get("label");
    const todos = m.get("todos");
    return new TodoList(label, todos);
  }
}
