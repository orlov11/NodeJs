document.addEventListener('click', e => {
	if (e.target.dataset.type === 'remove') {
		const id = e.target.dataset.id
		console.log('remove ' + id)
		remove(id).then(() => {
			e.target.closest('li').remove()
		})
	} else if (e.target.dataset.type === 'rename') {
		const newTitle = {
			title: prompt('Ввудите новое название'),
			id: e.target.dataset.id
		}
		const id = e.target.dataset.id

		if (newTitle) {
			rename(id, newTitle).then(() => {
				location.reload()
			})
		}
	}
})

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE'
	})
}

async function rename(id, obj) {
	console.log(obj)
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(obj)
	})
}
