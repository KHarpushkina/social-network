"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
    var token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      _jsonwebtoken.default.verify(token, process.env.RSA_PUBLIC_KEY, {
        algorithms: ["RS256"]
      }, function (err, decoded) {
        if (err) {
          res.status(401);
          return next(new Error("Session has expired. Please login"));
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      res.status(401);
      return next(new Error("Login required"));
    }
  }
};
exports.default = _default;