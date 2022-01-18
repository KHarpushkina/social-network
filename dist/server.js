"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("./models/User.js"));

var _serverSetup = _interopRequireDefault(require("./helpers/server-setup.js"));

require("dotenv").config();

var app = (0, _express.default)();

_mongoose.default.connect(process.env.MONGODB_CONNECTION_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  app.listen(process.env.APP_PORT, function () {
    console.log("Connect");
  });
});

app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.post("/login", function (req, res, next) {
  _User.default.findOne({
    email: req.body.user.email
  }, function (err, user) {
    if (err) {
      res.send(err);
    }

    if (!user) {
      res.status(401);
      return next(new Error("Please provide valid email and password"));
    }

    _bcrypt.default.compare(req.body.user.password, user.password, function (errWhenHash, result) {
      if (!result) {
        res.status(401);
        return next(new Error("Please provide valid email and password"));
      } else {
        var jwtToken = _jsonwebtoken.default.sign({}, process.env.RSA_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: 20 * 60,
          subject: "" + user._id
        });

        res.status(200).send({
          signed_user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          expiresIn: 20 * 60,
          token: jwtToken
        });
      }
    });
  });
});
app.post("/create-user", function (req, res, next) {
  var user = new _User.default(req.body.user);

  _bcrypt.default.hash(req.body.user.password, 10, function (err, hash) {
    user.password = hash;

    _serverSetup.default.saveDocument(user).then(function (response) {
      return res.send(response);
    }).catch(function (err) {
      return next(err);
    });
  });
}); //app.use(middleware.ensureAuthenticated);

app.use(function (err, req, res, next) {
  res.status(500);
  res.statusMessage = err;
  res.send(err);
});