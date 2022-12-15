export class Note {
  public id?: number;
  public owner: number;
  public notebook?: number;
  public label: string;
  public dateEdited: string;
  public content: any[];
  constructor(
    owner: number,
    label: string,
    dateEdited: string,
    content: any[],
    id?: number,
    notebook?: number
  ) {
    if (id) this.id = id;
    this.owner = owner;
    this.notebook = notebook;
    this.label = label;
    this.dateEdited = dateEdited;
    this.content = content;
  }
  public static emptyModel(notebook: number) {
    return new Note(
      -1,
      "Default Label",
      new Date().toDateString(),
      [{ type: "paragraph", children: [{ text: "First Text" }] }],
      undefined,
      notebook
    );
  }
  public static fromNote(n: Note) {
    if (n.id)
      return new Note(
        n.owner,
        n.label,
        n.dateEdited,
        n.content.map((e) => JSON.parse(e)),
        n.id,
        n.notebook
      );

    return new Note(
      n.owner,
      n.label,
      n.dateEdited,
      n.content.map((e) => JSON.parse(e)),

      n.notebook
    );
  }
}
