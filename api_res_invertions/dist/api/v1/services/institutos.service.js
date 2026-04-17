"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateObjInSubdocument = exports.putInstitutoItem = exports.pushObjToSubdocument = exports.postInstitutos = exports.getInstitutosList = exports.getInstitutoItem = exports.deleteInstitutoItem = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Institutos = _interopRequireDefault(require("../models/Institutos"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
//Education

//FIC: GET INSTITUTOS LIST
var getInstitutosList = exports.getInstitutosList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var institutosList, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 1;
          return _Institutos["default"].find();
        case 1:
          institutosList = _context.sent;
          return _context.abrupt("return", institutosList);
        case 2:
          _context.prev = 2;
          _t = _context["catch"](0);
          throw _boom["default"].internal(_t);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function getInstitutosList() {
    return _ref.apply(this, arguments);
  };
}();

//FIC: GET INSTITUTO BY ID
var getInstitutoItem = exports.getInstitutoItem = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id, keyType) {
    var institutoItem, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(keyType === 'OK')) {
            _context2.next = 2;
            break;
          }
          _context2.next = 1;
          return _Institutos["default"].findOne({
            IdInstitutoOK: id
          });
        case 1:
          institutoItem = _context2.sent;
          _context2.next = 4;
          break;
        case 2:
          if (!(keyType === 'BK')) {
            _context2.next = 4;
            break;
          }
          _context2.next = 3;
          return _Institutos["default"].findOne({
            IdInstitutoBK: id
          });
        case 3:
          institutoItem = _context2.sent;
        case 4:
          return _context2.abrupt("return", institutoItem);
        case 5:
          _context2.prev = 5;
          _t2 = _context2["catch"](0);
          throw _boom["default"].internal(_t2);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function getInstitutoItem(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

//FIC: POST (ADD) INSTITUTO
var postInstitutos = exports.postInstitutos = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(paInstitutoItem) {
    var newInstitutoItem, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          newInstitutoItem = new _Institutos["default"](paInstitutoItem);
          _context3.next = 1;
          return newInstitutoItem.save();
        case 1:
          return _context3.abrupt("return", _context3.sent);
        case 2:
          _context3.prev = 2;
          _t3 = _context3["catch"](0);
          throw _boom["default"].internal(_t3);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function postInstitutos(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

//NOTA 7.1.2: PUSH A SUBDOCUMENTO - ARREGLO DE OBJETOS
//FIC: ADD ELEMENT TO SUBDOCUMENT ARRAY
//Ejemplo: Agregar información adicional a institutos (si tuviera subdocumentos)
var pushObjToSubdocument = exports.pushObjToSubdocument = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(id, objToAdd, fieldName) {
    var institutUpdated, _t4;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 1;
          return _Institutos["default"].findOneAndUpdate({
            IdInstitutoBK: id
          }, {
            $push: (0, _defineProperty2["default"])({}, fieldName, objToAdd)
          }, {
            "new": true
          });
        case 1:
          institutUpdated = _context4.sent;
          return _context4.abrupt("return", {
            success: true,
            institutUpdated: institutUpdated
          });
        case 2:
          _context4.prev = 2;
          _t4 = _context4["catch"](0);
          return _context4.abrupt("return", {
            success: false,
            error: _t4
          });
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function pushObjToSubdocument(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

//NOTA 8.1: PUT (MODIFY) INSTITUTOS
//FIC: PUT API
//Método para actualizar un Instituto existente
var putInstitutoItem = exports.putInstitutoItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(id, paInstitutoItem) {
    var _t5;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 1;
          return _Institutos["default"].findOneAndUpdate({
            IdInstitutoOK: id
          }, paInstitutoItem, {
            "new": true
          });
        case 1:
          return _context5.abrupt("return", _context5.sent);
        case 2:
          _context5.prev = 2;
          _t5 = _context5["catch"](0);
          throw _boom["default"].badImplementation(_t5);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function putInstitutoItem(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

//NOTA 8.1.1: PUT SUBDOCUMENTO - ARREGLO DE OBJETOS
//FIC: UPDATE ELEMENT IN SUBDOCUMENT ARRAY
//Método para actualizar elementos dentro de un arreglo de objetos en un subdocumento
var updateObjInSubdocument = exports.updateObjInSubdocument = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(id, objToUpdate, fieldName) {
    var institutUpdated, _t6;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 1;
          return _Institutos["default"].findOneAndUpdate({
            IdInstitutoOK: id
          }, {
            $set: (0, _defineProperty2["default"])({}, fieldName, objToUpdate)
          }, {
            "new": true
          });
        case 1:
          institutUpdated = _context6.sent;
          return _context6.abrupt("return", {
            success: true,
            institutUpdated: institutUpdated
          });
        case 2:
          _context6.prev = 2;
          _t6 = _context6["catch"](0);
          return _context6.abrupt("return", {
            success: false,
            error: _t6
          });
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function updateObjInSubdocument(_x9, _x0, _x1) {
    return _ref6.apply(this, arguments);
  };
}();

//NOTA 9.1: DELETE (REMOVE) INSTITUTOS
//FIC: DELETE API
//Método para eliminar un Instituto existente
var deleteInstitutoItem = exports.deleteInstitutoItem = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    var _t7;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 1;
          return _Institutos["default"].findOneAndDelete({
            IdInstitutoOK: id
          });
        case 1:
          return _context7.abrupt("return", _context7.sent);
        case 2:
          _context7.prev = 2;
          _t7 = _context7["catch"](0);
          throw _boom["default"].badImplementation(_t7);
        case 3:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function deleteInstitutoItem(_x10) {
    return _ref7.apply(this, arguments);
  };
}();