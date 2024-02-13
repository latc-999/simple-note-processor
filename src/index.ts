import express, { Express, Request, Response } from "express";
import { Note, validateNote } from "./types/Note";

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const notesMap: Record<number, Note> = {};
let noteCount: number = 0;

app.get("/", (req: Request, res: Response) => {
    res.send("Root landing placeholder, feel free to ignore");
});

app.post("/notes", (req: Request, res: Response) => {
    console.log("Creating note...");
    const data = req.body;
    console.log(`Received data: ${JSON.stringify(data)}`);
    console.log("Validating data...");

    if (validateNote(data)) {
        console.log("Inserting Note into map");
        noteCount++;
        notesMap[noteCount] = data;
        console.log(`Inserted note with ID # ${noteCount}.`)
        res.send(`Inserted note with ID # ${noteCount}.`)
    }
    else {
        res.status(400);
        res.send(`Note is not valid, it must consist of 'title' and 'body' parameters`)
    };
});

app.get("/notes", (req: Request, res: Response) => {
    console.log("Getting notes now");
    console.log(notesMap);
    res.send(notesMap);
});

app.get("/notes/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    console.log(`Getting note with ID # ${id}`);
    console.log(notesMap[id]);
    if (notesMap[id])
        res.send(notesMap[id]);
    else {
        res.status(404);
        res.send('No note found with that ID.')
    }
});

app.put("/notes/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (!notesMap[id]) {
        res.status(404);
        res.send('No note found with that ID.')
        return;
    }
    console.log(`Updating note with ID # ${id}`);
    const data = req.body;
    console.log(`Received data: ${JSON.stringify(data)}`);
    console.log("Validating data...");
    if (validateNote(data)) {
        notesMap[id] = data;
        console.log(`Updated note with ID # ${id}.`)
        res.send(`Inserted note with ID # ${id}.`)
    }
    else {
        res.status(400);
        res.send(`Note is not valid, it must consist of 'title' and 'body' parameters`)
    }
});

app.delete("/notes/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (!notesMap[id]) {
        res.status(404);
        res.send('No note found with that ID.')
        return;
    }
    console.log(`Deleting note with ID # ${id}`);
    console.log(notesMap[id]);
    delete notesMap[id];
    console.log(`Successfully deleted note with ID # ${id}`);
    res.send(`Successfully deleted note with ID # ${id}`);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
}) 