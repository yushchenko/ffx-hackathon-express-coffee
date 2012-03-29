# A tiny backend service developed during Fairfax Ditgital Mobile Team Hackathon on March 28 2012

The service built for AirNote provides very simple REST API for saving and retriving application's data.
It also does filtering of the data according user's location provided from client side.

GET

* http://119.15.69.247/h/board/get/:latitude/:longtitude/ - get boards around around specified point, "Spherical Law of Cosines" formulae used.
* http://119.15.69.247/h/reset/ - clean up service state (for debugging)

POST

* http://119.15.69.247/h/board/add-board/ - add new board
* http://119.15.69.247/h/board/add-page/:boardId/ - add new page to the specified board


For sake of simplicity, current implementation saves all data in Node.js memory,
so when the service restarted the state is lost.

## Used

+ Node.js
+ Express.js
+ Coffeescript

## ToDo

+ unit tests for model
+ tests for the API
+ performance tests for the API


## Refactoring

+ ? remove singleton for model, just export function from module
