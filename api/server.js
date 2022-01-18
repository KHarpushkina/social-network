import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./models/User.js";
import serverSetup from "./helpers/server-setup.js";

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB_CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    app.listen(process.env.APP_PORT, () => {
        console.log("Connect");
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.user.email }, (err, user) => {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(401);
            return next(new Error("Please provide valid email and password"));
        }
        bcrypt.compare(req.body.user.password, user.password, (errWhenHash, result) => {
            if (!result) {
                res.status(401);
                return next(new Error("Please provide valid email and password"));
            } else {
                const jwtToken = jwt.sign({}, process.env.RSA_PRIVATE_KEY, {
                    algorithm: "RS256",
                    expiresIn: 20 * 60,
                    subject: "" + user._id,
                });
                res.status(200).send({
                    signed_user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    expiresIn: 20 * 60,
                    token: jwtToken,
                });
            }
        });
    });
});

app.get("/user", (req, res, next) => {
    serverSetup
        .getDocumentById(User, req.query.id)
        .then((response) => res.status(200).send(response))
        .catch((err) => next(err));
});

app.post("/create-user", (req, res, next) => {
    let user = new User(req.body.user);
    bcrypt.hash(req.body.user.password, 10, function(err, hash) {
        user.password = hash;
        serverSetup
            .saveDocument(user)
            .then((response) => res.send(response))
            .catch((err) => next(err));
    });
});

//app.use(middleware.ensureAuthenticated);

app.use((err, req, res, next) => {
    res.status(500);
    res.statusMessage = err;
    res.send(err);
});
