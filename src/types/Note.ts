export interface Note {
  title: string;
  body: string;
}

export const validateNote = (note: Note) => {
  if (!note.title || !note.body)
    return false;
  return true;
}