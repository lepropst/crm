import { Todo } from "../todos";
import Model from "../utility/Model";

export class TodoList extends Model {
  public label: string;
  public id: string;
  public todos: Todo[];
  constructor(_id, _label, _todos?) {
    super();
    this.id = _id;
    this.label = _label;
    if (_todos) {
      this.todos = _todos;
    }
  }
  public static fromResponse(m: Map<String, any>): TodoList {
    console.log(m);
    let _id = m["id"];
    let _label = m["label"];
    let _todos = m["todos"];
    return new TodoList(_id, _label, _todos);
  }
}
