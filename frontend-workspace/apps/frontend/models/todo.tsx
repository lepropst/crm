export class Todo {
  public id: number;
  public list: number;
  public label: string;
  public dateDue: string;
  public description: string;
  public owner: string;
  constructor(
    id: number,
    list: number,
    label: string,
    dateDue: string,
    description: string,
    owner: string
  ) {
    this.id = id;
    this.list = list;
    this.label = label;
    this.dateDue = dateDue;
    this.description = description;
    this.owner = owner;
  }
  public static fromTodo(t: Todo) {
    return new Todo(t.id, t.list, t.label, t.dateDue, t.description, t.owner);
  }
}
