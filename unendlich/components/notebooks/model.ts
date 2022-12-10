import { Note } from "../notes/model";

export class NoteBook {
  public owner: number;
  public label: string;
  public dateEdited: string;
  public notes?: Note[];
  public id?: number;
  constructor(
    owner: number,
    label: string,
    dateEdited: string,
    notes?: Note[],
    id?: number
  ) {
    this.owner = owner;
    this.label = label;
    this.dateEdited = dateEdited;
    if (notes) this.notes = notes;
    if (id) this.id = id;
  }
  public static emptyModel(user: any) {
    return new NoteBook(user.id, "default label", new Date().toDateString(), [
      {
        label: "first Note",
        owner: user.id,
        dateEdited: new Date().toDateString(),
        content: [
          {
            type: "paragraph",
            children: [
              { text: "This is editable " },
              { text: "rich", bold: true },
              { text: " text, " },
              { text: "much", italic: true },
              { text: " better than a " },
              { text: "<textarea>", code: true },
              { text: "!" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
              },
              { text: "bold", bold: true },
              {
                text: ", or add a semantically rendered block quote in the middle of the page, like this:",
              },
            ],
          },
          {
            type: "block-quote",
            children: [{ text: "A wise quote." }],
          },
          {
            type: "paragraph",
            align: "center",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
    ]);
  }
  public static fromNoteBook(m: NoteBook): NoteBook {
    return new NoteBook(m.owner, m.label, m.dateEdited, m.notes, m.id);
  }
}

export default NoteBook;
