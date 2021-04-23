const chalk = require("chalk");
const fs = require("fs");

const { listNotes } = require("./notes");

test('it lists all notes from the database correctly', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify([{"title":"Third Note Title","body":"Seecond Note Body"},{"title":"Forth Note Title","body":"Seecond Note Body"}]));
    const spy = jest.spyOn(console, "log").mockImplementation();

    listNotes();

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls).toEqual([
        [chalk.yellow("Your notes")],
        ["Third Note Title"],
        ["Forth Note Title"]
    ]);
})