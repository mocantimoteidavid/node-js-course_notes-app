const chalk = require('chalk');
const fs = require('fs');

const listNotes = () => {
    console.log(chalk.yellow("Your notes"));

    const notes = loadNotes();
    notes.forEach((note) => console.log(note.title));
}

const removeNote = (title) => {
    if (!title) {
        console.log(chalk.red("Please provide a title for the note!"));
    }

    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.title !== title);

    if (notes.length === updatedNotes.length) {
        console.log(chalk.red("No note removed!"));
    } else {
        saveNotes(updatedNotes);
        console.log(chalk.green("Note removed!"));
    }
}

const readNote = (title) => {
    if (!title) {
        console.log("Need to specify the title of the note");
        return;
    }

    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.yellow(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red("No note found using that title"));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (duplicateNote) {
        console.log(chalk.red("Note title already exists"));
    } else {
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log(chalk.green("Note added successfully!"));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
    
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
}