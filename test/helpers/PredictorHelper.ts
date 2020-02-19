import express, { Express, Request, Response, NextFunction } from 'express';

export default class PredictorHelper {
    private requests: any[] = [];
    private responses: any[]= [];
    private connections: any[] = [];
    private app: Express;

    constructor() {
        this.app = express();
    }

    public startServer() {

        return new Promise((resolve, reject) => {
            try {
                this.app.post('/predict', (req: Request, res: Response, next: NextFunction) => {
                    const response = this.responses.shift();

                    res.status(200).json(response);
                });

                const connection = this.app.listen(process.env.PREDICTOR_DEV_PORT, () => {
                    console.log("Starting Predictor Mock Server at port", process.env.PREDICTOR_DEV_PORT);
                    resolve();
                });

                this.connections.push(connection);
            } catch (err) {
                reject(err);
            }
        });
    }

    public stopServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                for (const connection of this.connections) {
                    connection.close();
                }

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    public getRequests() {
        return this.requests;
    }

    public setResponses(responses: any[]) {
        this.responses = responses;
    }

    public clear() {
        this.responses = [];
        this.requests = [];
    }
}