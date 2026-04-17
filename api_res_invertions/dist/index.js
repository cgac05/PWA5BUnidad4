"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
var port = _app["default"].get('port') || process.env.PORT || 3000;
_app["default"].listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("API listening on port ".concat(port));
});