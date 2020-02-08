// import express = require("express");
import express from 'express';
import serverless = require("serverless-http");
import * as bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.log(`Error found: ${err.message}`);
    res.status(500).json(err.stack);
});

module.exports.handler = serverless(app);