export class Todo {
  public id: number;
  public list: number;
  public label: string;
  public dateDue: string;
  public description: string;
  constructor(
    id: number,
    list: number,
    label: string,
    dateDue: string,
    description: string
  ) {
    this.id = id;
    this.list = list;
    this.label = label;
    this.dateDue = dateDue;
    this.description = description;
  }
  public static fromResponse(m: Map<string, string | number>) {
    const list = m.get("list") as number;
    const id = m.get("id") as number;
    const label = m.get("label") as string;
    const dateDue = m.get("dateDue") as string;
    const description = m.get("description") as string;
    return new Todo(id, list, label, dateDue, description);
  }
}
