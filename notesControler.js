const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { type } = require('os')

const notesPath = path.join(__dirname, 'db.json')

async function addNotes(title) {
	const notes = await getNote()
	const note = {
		title,
		id: Date.now().toString()
	}
	notes.push(note)
	await saveNote(notes)
	console.log(chalk.red('Note was added'))
}
async function saveNote(note) {
	await fs.writeFile(notesPath, JSON.stringify(note))
}

async function getNote() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNote()
	console.log(chalk.yellow('List notes:'))
	notes.forEach(note => {
		console.log(
			`Title: ${chalk.blue(note.title)}, id: ${chalk.green(note.id)}`
		)
	})
}

async function removeNotes(id) {
	const notes = await getNote()
	const newNotes = notes.filter(note => note.id !== id)
	await saveNote(newNotes)
	console.log(chalk.red('Note was remove'))
}

async function renameNotes(title, id) {
	const notes = await getNote()
	const newNote = notes.map(note => {
		if (note.id === id) {
			return { ...note, title }
		}
		return note
	})
	await saveNote(newNote)
	console.log(chalk.red('Note was rename'))
}

module.exports = {
	addNotes,
	renameNotes,
	getNote,
	removeNotes
}
