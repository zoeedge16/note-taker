const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());


app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Application is running @ http://localhost:${PORT}`);
});

