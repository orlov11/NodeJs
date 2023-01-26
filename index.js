const yargs = require('yargs')
const { addNotes, printNotes, removeNotes } = require('./notesControler')

yargs.command({
	command: 'add',
	describe: 'add new note in list',
	builder: {
		title: {
			type: 'string',
			describe: 'note title',
			demandOption: true
		}
	},
	handler({ title }) {
		addNotes(title)
	}
})
yargs.command({
	command: 'remove',
	describe: 'remove note',
	builder: {
		id: {
			type: 'string',
			describe: 'note id for remove',
			demandOption: true
		}
	},
	handler({ id }) {
		removeNotes(id)
	}
})

yargs.command({
	command: 'list',
	describe: 'show all note',
	handler() {
		printNotes()
	}
})

yargs.parse()
