express = require 'express'
model = require('./model.js').model # ? rename to data.model

app = express.createServer express.bodyParser()
port = 8087

# ROUTES

# for connectivity testing
app.get '/', (req, res) ->
  res.send('Hackathon!')

app.get '/board/get/:lat/:long/', (req, res) ->
  lat = Number req.params.lat
  long = Number req.params.long

  res.send (model.getBoardsByLatLong lat, long), 200

# Body - Form
# data: { "title": "board title", "latitude": 1, "longtitude": 1, "radius": 1 }

app.post '/board/add-board/', (req, res) ->
  board = JSON.parse req.body.data

  res.send (model.addBoard board), 200

# Body - Form
# data: { "title": "page title" }

app.post '/board/add-page/:boardId/', (req, res) ->
  boardId = Number req.params.boardId
  board = model.getBoardById boardId

  if not board
    res.send 'board not found', 500
    return

  newPage = model.addPageToBoard board, JSON.parse(req.body.data)
  res.send newPage, 200

app.get '/reset/', (req, res) ->
  model.reset()
  res.send 'Reset done.'

app.listen(port)
console.log "App is running at #{port}"