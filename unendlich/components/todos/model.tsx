export class Todo {
  public list: number;
  public label: string;
  public dateDue: string;
  public description: string;
  constructor(
    list: number,
    label: string,
    dateDue: string,
    description: string
  ) {
    this.list = list;
    this.label = label;
    this.dateDue = dateDue;
    this.description = description;
  }
  public static fromResponse(m: Map<string, string | number>) {
    const list = m.get("list") as number;

    const label = m.get("label") as string;
    const dateDue = m.get("dateDue") as string;
    const description = m.get("description") as string;
    return new Todo(list, label, dateDue, description);
  }
}
