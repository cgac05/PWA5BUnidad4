"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateElementInSubdocument = exports.putInstitutoItem = exports.pushElementToSubdocument = exports.postInstitutoItem = exports.getInstitutosList = exports.getInstitutoItem = exports.deleteInstitutoItem = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var InstitutosServices = _interopRequireWildcard(require("../services/institutos.service"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _resp = require("../../../middlewares/resp.handler");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t8 in e) "default" !== _t8 && {}.hasOwnProperty.call(e, _t8) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t8)) && (i.get || i.set) ? o(f, _t8, i) : f[_t8] = e[_t8]); return f; })(e, t); }
//FIC: API GET 
//---------------------------------------- 
//FIC: Todos los Institutos.
var getInstitutosList = exports.getInstitutosList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var institutosList, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 1;
          return InstitutosServices.getInstitutosList();
        case 1:
          institutosList = _context.sent;
          if (!(!institutosList || institutosList.length === 0)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(404).json((0, _resp.FAIL)('No se encontraron institutos registrados.')));
        case 2:
          res.status(200).json(institutosList);
          _context.next = 4;
          break;
        case 3:
          _context.prev = 3;
          _t = _context["catch"](0);
          next(_t);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function getInstitutosList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//FIC: Solo un Instituto.
var getInstitutoItem = exports.getInstitutoItem = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, keyType, institutoItem, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          keyType = req.query.keyType || 'OK';
          _context2.next = 1;
          return InstitutosServices.getInstitutoItem(id, keyType);
        case 1:
          institutoItem = _context2.sent;
          if (institutoItem) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", res.status(404).json((0, _resp.FAIL)('Instituto no encontrado.')));
        case 2:
          res.status(200).json(institutoItem);
          _context2.next = 4;
          break;
        case 3:
          _context2.prev = 3;
          _t2 = _context2["catch"](0);
          next(_t2);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function getInstitutoItem(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

//FIC: API POST
//----------------------------------------
//NOTA 7.2 Y 7.2.1: Agregar nuevo Instituto con manejo de status 201/409
var postInstitutoItem = exports.postInstitutoItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var newInstituto, institutoCreated, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          newInstituto = req.body;
          _context3.next = 1;
          return InstitutosServices.postInstitutos(newInstituto);
        case 1:
          institutoCreated = _context3.sent;
          if (!institutoCreated) {
            // Status 400: Bad Request
            res.status(400).json((0, _resp.FAIL)('No se pudo crear el instituto.'));
          } else if (institutoCreated) {
            // Status 201: Created - Indica creación exitosa
            res.status(201).json((0, _resp.OK)('Instituto agregado correctamente al catálogo.', institutoCreated));
          }
          _context3.next = 4;
          break;
        case 2:
          _context3.prev = 2;
          _t3 = _context3["catch"](0);
          if (!(_t3.code === 11000)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(409).json((0, _resp.FAIL)('Instituto ya existe en el sistema.', _t3)));
        case 3:
          next(_t3);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function postInstitutoItem(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

//NOTA 7.1.2: Controlador para agregar elemento a subdocumento (array)
var pushElementToSubdocument = exports.pushElementToSubdocument = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$params, id, fieldName, objToAdd, result, _t4;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$params = req.params, id = _req$params.id, fieldName = _req$params.fieldName;
          objToAdd = req.body;
          _context4.next = 1;
          return InstitutosServices.pushObjToSubdocument(id, objToAdd, fieldName);
        case 1:
          result = _context4.sent;
          if (result.success) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return", res.status(400).json((0, _resp.FAIL)('No se pudo agregar el elemento al subdocumento.', result.error)));
        case 2:
          // Status 200: OK - Actualización exitosa
          res.status(200).json((0, _resp.OK)('Elemento agregado correctamente al subdocumento.', result.institutUpdated));
          _context4.next = 4;
          break;
        case 3:
          _context4.prev = 3;
          _t4 = _context4["catch"](0);
          next(_t4);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function pushElementToSubdocument(_x0, _x1, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

//FIC: API PUT
//----------------------------------------
//NOTA 8.2: Actualizar Instituto existente
var putInstitutoItem = exports.putInstitutoItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, paInstitutoItem, updatedInstitutoItem, _t5;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          console.log('FIC: controller id --> ', id);
          paInstitutoItem = req.body;
          console.log('FIC: controller body --> ', paInstitutoItem);
          _context5.next = 1;
          return InstitutosServices.putInstitutoItem(id, paInstitutoItem);
        case 1:
          updatedInstitutoItem = _context5.sent;
          if (updatedInstitutoItem) {
            _context5.next = 2;
            break;
          }
          throw _boom["default"].badRequest('No se pudo actualizar el Instituto.');
        case 2:
          if (updatedInstitutoItem) {
            // Status 200: OK - Actualización exitosa
            res.status(200).json(updatedInstitutoItem);
          }
        case 3:
          _context5.next = 5;
          break;
        case 4:
          _context5.prev = 4;
          _t5 = _context5["catch"](0);
          next(_t5);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return function putInstitutoItem(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

//NOTA 8.1.1: Controlador para actualizar elemento en subdocumento (array)
var updateElementInSubdocument = exports.updateElementInSubdocument = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$params2, id, fieldName, objToUpdate, result, _t6;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$params2 = req.params, id = _req$params2.id, fieldName = _req$params2.fieldName;
          objToUpdate = req.body;
          _context6.next = 1;
          return InstitutosServices.updateObjInSubdocument(id, objToUpdate, fieldName);
        case 1:
          result = _context6.sent;
          if (result.success) {
            _context6.next = 2;
            break;
          }
          return _context6.abrupt("return", res.status(400).json((0, _resp.FAIL)('No se pudo actualizar el elemento en el subdocumento.', result.error)));
        case 2:
          // Status 200: OK - Actualización exitosa
          res.status(200).json((0, _resp.OK)('Elemento actualizado correctamente en el subdocumento.', result.institutUpdated));
          _context6.next = 4;
          break;
        case 3:
          _context6.prev = 3;
          _t6 = _context6["catch"](0);
          next(_t6);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 3]]);
  }));
  return function updateElementInSubdocument(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();

//FIC: API DELETE
//----------------------------------------
//NOTA 9.2: Eliminar Instituto existente
var deleteInstitutoItem = exports.deleteInstitutoItem = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, deletedInstitutoItem, _t7;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          console.log('FIC: controller DELETE id --> ', id);
          _context7.next = 1;
          return InstitutosServices.deleteInstitutoItem(id);
        case 1:
          deletedInstitutoItem = _context7.sent;
          if (deletedInstitutoItem) {
            _context7.next = 2;
            break;
          }
          throw _boom["default"].notFound('No se encontró el Instituto a eliminar.');
        case 2:
          if (deletedInstitutoItem) {
            // Status 200: OK - Eliminación exitosa
            res.status(200).json((0, _resp.OK)('Instituto eliminado correctamente del catálogo.', deletedInstitutoItem));
          }
        case 3:
          _context7.next = 5;
          break;
        case 4:
          _context7.prev = 4;
          _t7 = _context7["catch"](0);
          next(_t7);
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 4]]);
  }));
  return function deleteInstitutoItem(_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();