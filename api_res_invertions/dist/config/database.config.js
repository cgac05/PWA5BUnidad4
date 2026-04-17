"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mongoose", {
  enumerable: true,
  get: function get() {
    return _mongoose["default"];
  }
});
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var db, _t;
  return _regenerator["default"].wrap(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 1;
        return _mongoose["default"].connect(_config["default"].CONNECTION_STRING, {
          //useNewUrlParser: true, 
          //useUnifiedTopology: true, 
          dbName: _config["default"].DATABASE
        });
      case 1:
        db = _context.sent;
        console.log('Database is connected to: ', db.connection.name);
        _context.next = 3;
        break;
      case 2:
        _context.prev = 2;
        _t = _context["catch"](0);
        console.log('Error: ', _t);
      case 3:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 2]]);
}))();