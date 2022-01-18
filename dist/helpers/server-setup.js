"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  saveDocument: function saveDocument(document) {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return document.save();

            case 2:
              result = _context.sent;
              console.log(1);

              if (!result) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", result);

            case 8:
              throw new Error(JSON.stringify({
                status: 404,
                message: "Failed to save document"
              }));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  deleteDocument: function deleteDocument(model, selectors) {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var result;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return model.deleteOne(selectors);

            case 2:
              result = _context2.sent;

              if (!result) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", result);

            case 7:
              throw new Error(JSON.stringify({
                status: 404,
                message: "Failed to delete document"
              }));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
exports.default = _default;