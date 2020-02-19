// import express = require("express");
import express from 'express';
import serverless = require("serverless-http");
import * as bodyParser from 'body-parser';
import routes from './routes';
import { BadRequestError } from './validators/PredictionValidator';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.log(`Error found: ${err.message}`, err);

    if (err instanceof BadRequestError) {
        res.status(400).send("Bad Request").end();
    } else {
        res.status(500).json({ stack: err.stack, message: err.message });
    }
});

module.exports.handler = serverless(app);