(function() {
  var addBoard, addPageToBoard, app, express, getBoardById, getBoardsByLatLong, getDistance, port, state;

  express = require('express');

  app = express.createServer(express.bodyParser());

  port = 8087;

  app.get('/', function(req, res) {
    return res.send('Hackathon!');
  });

  app.get('/board/get/:lat/:long/', function(req, res) {
    var filteredBoards, lat, long;
    lat = Number(req.params.lat);
    long = Number(req.params.long);
    filteredBoards = getBoardsByLatLong(lat, long);
    return res.send(filteredBoards, 200);
  });

  app.post('/board/add-board/', function(req, res) {
    var b, board;
    board = JSON.parse(req.body.data);
    b = addBoard(board);
    return res.send(b, 200);
  });

  app.post('/board/add-page/:boardId/', function(req, res) {
    var b, board, boardId;
    boardId = Number(req.params.boardId);
    board = getBoardById(boardId);
    if (!board) {
      res.send('board not found', 500);
      return;
    }
    b = addPageToBoard(board, JSON.parse(req.body.data));
    return res.send(b, 200);
  });

  app.get('/reset/', function(req, res) {
    state.boards = [];
    state.nextBoardId = 1;
    state.nextPageId = 1;
    return res.send('Done');
  });

  state = {
    boards: [],
    nextBoardId: 1,
    nextPageId: 1
  };

  addBoard = function(board) {
    board.id || (board.id = state.nextBoardId);
    state.nextBoardId += 1;
    board.pages || (board.pages = []);
    state.boards.push(board);
    return board;
  };

  getBoardById = function(id) {
    var b, _i, _len, _ref;
    _ref = state.boards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      if (b.id === id) return b;
    }
    return null;
  };

  addPageToBoard = function(board, page) {
    page.id || (page.id = state.nextPageId);
    state.nextPageId += 1;
    board.pages.push(page);
    return page;
  };

  getBoardsByLatLong = function(lat, long) {
    var b, _i, _len, _ref, _results;
    _ref = state.boards;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      if (getDistance(b.latitude, b.longtitude, lat, long) < b.radius) {
        _results.push(b);
      }
    }
    return _results;
  };

  getDistance = function(lat1, long1, lat2, long2) {
    var R;
    R = 6371;
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * R;
  };

  app.listen(port);

  console.log("App is running at " + port);

}).call(this);
