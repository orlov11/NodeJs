const chalk = require('chalk')
const express = require('express')
const path = require('path')
const {
	addNotes,
	getNote,
	removeNotes,
	renameNotes
} = require('./notesControler')

const port = 3000
const app = express()
app.use(
	express.urlencoded({
		extended: true
	})
)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'base')

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNote(),
		create: false
	})
})
app.post('/', async (req, res) => {
	await addNotes(req.body.title)
	res.render('index', {
		title: 'Express App',
		notes: await getNote(),
		create: true
	})
})

app.delete('/:id', async (req, res) => {
	await removeNotes(req.params.id)
	res.render('index', {
		title: 'Express App',
		notes: await getNote(),
		create: false
	})
})

app.put('/:id', async (req, res) => {
	await renameNotes(req.body.title, req.body.id)

	res.render('index', {
		title: 'Express App',
		notes: await getNote(),
		create: false
	})
})

app.listen(port, () => {
	console.log(chalk.red(`Sever has been started on port: ${port}`))
})
