import express from 'express';

import "dotenv/config";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
//mongoose.connect("mongodb://localhost:27017/kanbas");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/spotify';
mongoose.connect(CONNECTION_STRING);


const app = express()
app.use(cors({credentials: true,
    origin: process.env.FRONTEND_URL}));


const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(
    session(sessionOptions)
);
app.use(express.json());

UserRoutes(app);
app.listen(process.env.PORT || 4000);