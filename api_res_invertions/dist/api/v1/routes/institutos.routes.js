"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var InstitutosController = _interopRequireWildcard(require("../controllers/institutos.controller"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
//Education

var router = (0, _express.Router)();

//API GET
router.get('/', InstitutosController.getInstitutosList);
router.get('/:id', InstitutosController.getInstitutoItem);

//API POST
router.post('/', InstitutosController.postInstitutoItem);

//API PUT
//NOTA 8.3: Ruta PUT para actualizar Instituto
router.put('/:id', InstitutosController.putInstitutoItem);

//API DELETE
//NOTA 9.3: Ruta DELETE para eliminar Instituto
router["delete"]('/:id', InstitutosController.deleteInstitutoItem);
var _default = exports["default"] = router;