const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '/client/build')))

app.route('/')
	.get((req, res) => {
		return res.sendFile(path.join(__dirname, '/client/build/index.html'))
	})

const timestamp = new Date().toLocaleString()

const confirmStart = () => console.log(`${timestamp}: Server initialised on PORT ${PORT}...`)

const server = app.listen(PORT, confirmStart)