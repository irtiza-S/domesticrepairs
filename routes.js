
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'


import { login, register } from './modules/accounts.js'
import { getAllIssues, addIssue, getUnassignedIssues } from './modules/issues.js'

const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()

// the routes defined here
router.get('/', context => {
	const authorised = context.cookies.get('authorised')
	if (authorised === 'undefined') context.response.redirect('/login')
	context.response.redirect('/home')
})

router.get('/home', async context => {
    const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
    const data = { authorised } //stores the current logged user
    const records = await getAllIssues() //returns an array
    data.records = records
    console.log(data)
    const body = await handle.renderView('home', data)
    console.log(body)
    context.response.body = body 
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', context => {
    context.cookies.delete('authorised')
    context.response.redirect('/')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		context.cookies.set('authorised', username)
		context.response.redirect('/home')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.get('/new', async context => {
    console.log('GET /new')
    const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
    const body = await handle.renderView('new')
    context.response.body = body  
})

router.post('/new', async context => {
    console.log('POST /new')
    const body = await context.request.body({ type: 'form-data'})
    const data = await body.value.read()
    data.username = context.cookies.get('authorised')
    await addIssue(data)
    context.response.redirect('/')
})

router.get('/work', async context => {
    console.log('GET /work')
    const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
    const data = { authorised }
    const records = await getUnassignedIssues()
//     for(const record of records) {
//         console.log(record)
//     }
    data.records = records
    const body = await handle.renderView('work', data)
    context.response.body = body
})

export default router
