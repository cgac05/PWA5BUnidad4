"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
//Education
var institutosSchema = new mongoose.Schema({
  IdInstitutoOK: {
    type: String,
    required: true
  },
  IdInstitutoBK: {
    type: String,
    required: true
  },
  DesInstituto: {
    type: String,
    required: true
  },
  Alias: {
    type: String,
    required: false
  },
  Matriz: {
    type: String,
    required: false
  },
  Giro: {
    type: String,
    required: false
  },
  IdInstitutoSupOK: {
    type: String,
    required: false
  }
});

//Education
var _default = exports["default"] = mongoose.model('cat_institutos', institutosSchema, 'cat_institutos');