class Model

  boards: []
  nextBoardId: 1
  nextPageId: 1

  reset: ->
    @boards = []
    @nextBoardId = 1
    @nextPageId = 1

  addBoard: (board) ->
    board.id or= @nextBoardId
    @nextBoardId += 1
    board.pages or= []
    @boards.push board
    board

  getBoardById: (id) ->
    for b in @boards
      return b if b.id is id
    null

  addPageToBoard: (board, page) ->
    page.id or= @nextPageId
    @nextPageId += 1
    board.pages.push page
    page

  getBoardsByLatLong: (lat, long) ->
    (b for b in @boards when @getDistance(b.latitude, b.longtitude, lat, long) < b.radius)

  getDistance: (lat1, long1, lat2, long2) ->
    # http://www.movable-type.co.uk/scripts/latlong.html
    # Spherical Law of Cosines
    R = 6371; #km
    Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1))*R

exports.model = new Model       # singleton, we need only one instance
