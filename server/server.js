#!/usr/bin/env node
const { name, root, port: configPort } = require('config')
const port = process.env.PORT ? parseInt(process.env.PORT) : configPort
const express = require('express')
const serveFavicon = require('serve-favicon')
const requestsLogger = require('./middlewares/requests_logger')
const cors = require('./middlewares/cors')
const publicFileRoot = process.cwd() + '/public/'

const app = express()
app.use(requestsLogger)

const favicon = serveFavicon(publicFileRoot + 'favicon.ico')
app.use(favicon)

app.use(cors)

const homeHtmlPath = process.cwd() + '/server/home.html'
app.get(`${root}/`, (req, res) => res.sendFile(homeHtmlPath))

app.get(`${root}/:hashtag`, require('./hashtag'))

app.listen(port, err => {
  if (err) console.error(err, 'startup error')
  else console.log(`${name} started on port ${port}`)
})
