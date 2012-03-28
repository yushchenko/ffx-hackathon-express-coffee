express = require 'express'
app = express.createServer express.bodyParser()
port = 8087

# ROUTES

app.get '/', (req, res) ->
  res.send('Hackathon!')

app.get '/board/get/:lat/:long/', (req, res) ->
  lat = Number req.params.lat
  long = Number req.params.long
  filteredBoards = getBoardsByLatLong lat, long

  res.send filteredBoards, 200

app.post '/board/add-board/', (req, res) ->
  board = JSON.parse req.body.data
  b = addBoard board

  res.send b, 200

app.post '/board/add-page/:boardId/', (req, res) ->
  boardId = Number req.params.boardId
  board = getBoardById boardId
  if not board
    res.send 'board not found', 500
    return
  b = addPageToBoard board, JSON.parse(req.body.data)

  res.send b, 200

app.get '/reset/', (req, res) ->
  state.boards = []
  state.nextBoardId = 1
  state.nextPageId = 1
  res.send 'Done'

# DATA

state =
  boards: []
  nextBoardId: 1
  nextPageId: 1

addBoard = (board) ->
  board.id or= state.nextBoardId
  state.nextBoardId += 1
  board.pages or= []
  state.boards.push board
  board

getBoardById = (id) ->
  for b in state.boards
    return b if b.id is id
  null

addPageToBoard = (board, page) ->
  page.id or= state.nextPageId
  state.nextPageId += 1
  board.pages.push page
  page

getBoardsByLatLong = (lat, long) ->
  (b for b in state.boards when getDistance(b.latitude, b.longtitude, lat, long) < b.radius)

# UTILS

getDistance = (lat1, long1, lat2, long2) ->
  # http://www.movable-type.co.uk/scripts/latlong.html
  # Spherical Law of Cosines
  R = 6371; #km
  Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1))*R

app.listen(port)

console.log "App is running at #{port}"