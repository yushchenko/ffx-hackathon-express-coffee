var app, express, model, port;

express = require('express');

model = require('./model.js').model;

app = express.createServer(express.bodyParser());

port = 8087;

app.get('/', function(req, res) {
  return res.send('Hackathon!');
});

app.get('/board/get/:lat/:long/', function(req, res) {
  var lat, long;
  lat = Number(req.params.lat);
  long = Number(req.params.long);
  return res.send(model.getBoardsByLatLong(lat, long), 200);
});

app.post('/board/add-board/', function(req, res) {
  var board;
  board = JSON.parse(req.body.data);
  return res.send(model.addBoard(board), 200);
});

app.post('/board/add-page/:boardId/', function(req, res) {
  var board, boardId, newPage;
  boardId = Number(req.params.boardId);
  board = model.getBoardById(boardId);
  if (!board) {
    res.send('board not found', 500);
    return;
  }
  newPage = model.addPageToBoard(board, JSON.parse(req.body.data));
  return res.send(newPage, 200);
});

app.get('/reset/', function(req, res) {
  model.reset();
  return res.send('Reset done.');
});

app.listen(port);

console.log("App is running at " + port);
