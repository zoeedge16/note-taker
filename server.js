const express = require('express');
const path = require('path');
// generate unique ID's for the notes
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());

const notesFilePath = path.join(__dirname, 'db', 'notes.json')

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = getNotesFromDB();
    return res.json(notes);
});

app.post('/api/notes', (req,res) => {
    const { title, text } = req.body;
    const newNote = {
        id: uuidv4(),
        title, 
        text,
    };
    const notes = getNotesFromDB();
    notes.push(newNote);
    saveNotesToDB(notes);
    return res.json(newNote);
})

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Application is running @ http://localhost:${PORT}`);
});

