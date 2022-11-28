import Model from "../utility/Model";

export class Todo extends Model {
  public label: string;
  public dateDue: string;
  public description: string;
  public id: string;

  constructor(_label, _dateDue, _description, _id) {
    super();
    this.id = _id;
    this.label = _label;
    this.dateDue = _dateDue;
    this.description = _description;
  }

  public static fromResponse(m: Map<String, String>): Todo {
    var label = m["label"];
    var dateDue = m["dateDue"];
    var description = m["description"];
    var id = m["id"];
    return new Todo(label, dateDue, description, id);
  }
}
export default Todo;
