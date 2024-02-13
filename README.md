## Introduction

This is a simple project that provides an API server to process 'Notes'.

A Note is a simple object with a Title and a Body.


## Setup Instructions - Local
1. Node.js should be installed on the system. The project was coded with Node v20, but it should work with any Node version above 14.
2. Clone the repository into local.
3. On a terminal / command line in the project's root folder, run **npm install** to install the dependencies.
4. Build the application by typing in **npm run build**.
5. After the application has successfully been built, run the API server by typing in **npm run start**.
6. Once the server starts, it can now be interacted with via an API Request solution of choice e.g. Postman, via the URL **localhost:3000**.

## API Usage

### POST - /notes
- Creates a new note to store into the notes map.
- Example input body:
```
{
    "title": "Test Title",
    "body": "This is a test body #1"
}
```

### GET - /notes
- Returns the list of all notes in JSON format for processing.

### GET - /notes/{note id}
- Returns a specific note when passed the ID in the URL. E.g. localhost:3000/notes/1 returns the note with ID # 1.
- Returns a 404 if the note ID is not found.

### PUT - /notes/{note id}
- Updates a specific note as specified in the ID in the URL.
- Returns a 404 if the note ID is not found.
- Example input body:
```
{
    "title": "Test Title",
    "body": "This is a test body #1"
}
```

### DELETE - /notes/{note id}
- Deletes a specific note from the notes map as specified in the ID in the url.
- Returns a 404 if the note ID is not found.

## Other notes and Assumptions

- The endpoints with bodies being passed must exactly be of the object with a 'title' and 'body' parameters, any variations should end up with a validation error 400 and prevent the request from going through.
- Notes are currently stored in-memory as the application runs, no file-based storage is provided in this project as of the moment.
- The notes are stored in a map object, and so the returned object is not an array but rather an object containing multiple note objects inside it with the note ID being the sort of property name.
- No limits or similar concepts have been enforced on the notes, the title and the body can be as long as it could be right now.
- Note IDs are automatically generated and is a simple counter increment. E.g. the first note to be created would have an ID # of 1, the 2nd is ID # 2, etc.