var Model;

Model = (function() {

  function Model() {}

  Model.prototype.boards = [];

  Model.prototype.nextBoardId = 1;

  Model.prototype.nextPageId = 1;

  Model.prototype.reset = function() {
    this.boards = [];
    this.nextBoardId = 1;
    return this.nextPageId = 1;
  };

  Model.prototype.addBoard = function(board) {
    board.id || (board.id = this.nextBoardId);
    this.nextBoardId += 1;
    board.pages || (board.pages = []);
    this.boards.push(board);
    return board;
  };

  Model.prototype.getBoardById = function(id) {
    var b, _i, _len, _ref;
    _ref = this.boards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      if (b.id === id) return b;
    }
    return null;
  };

  Model.prototype.addPageToBoard = function(board, page) {
    page.id || (page.id = this.nextPageId);
    this.nextPageId += 1;
    board.pages.push(page);
    return page;
  };

  Model.prototype.getBoardsByLatLong = function(lat, long) {
    var b, _i, _len, _ref, _results;
    _ref = this.boards;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      if (this.getDistance(b.latitude, b.longtitude, lat, long) < b.radius) {
        _results.push(b);
      }
    }
    return _results;
  };

  Model.prototype.getDistance = function(lat1, long1, lat2, long2) {
    var R;
    R = 6371;
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * R;
  };

  return Model;

})();

exports.model = new Model;
