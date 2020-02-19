import { expect } from 'chai';
import 'mocha';
import axios from 'axios';

import PredictorHelper from "../helpers/PredictorHelper";
// import LambdaHelper from "../helpers/LambdaHelper";

const apiUrl = "http://localhost:3000";
const predictorHelper = new PredictorHelper();

describe('Predict API',
    () => {
        const fixtures = {
            input: {
                age: 0,
                sex: 0,
                cp: 1,
                trestbps: 0,
                chol: 0,
                fbs: true,
                restecg: 0,
                thalach: 0,
                exang: true,
                oldpeak: 0,
                slope: 1,
                ca: 0,
                thal: 3
            }
        };

        before(async () => {
            await predictorHelper.startServer();
        });

        after(async () => {
            await predictorHelper.stopServer();
        });

        it('Must respond 1 as PRESENCE', async () => {
            predictorHelper.setResponses([
                [1]
            ]);

            const response = await axios.post(
                `http://localhost:3000/predict`,
                fixtures.input,
                { headers: { 'content-type': 'application/json' } }
            );

            expect(response.status).to.equals(200);
            expect(response.data).to.have.keys('status');
            expect(response.data.status).to.be.equals('presence');
        });

        it('Must respond 2 as PRESENCE', async () => {
            predictorHelper.setResponses([
                [2]
            ]);

            const response = await axios.post(
                `http://localhost:3000/predict`,
                fixtures.input,
                { headers: { 'content-type': 'application/json' } }
            );

            expect(response.status).to.equals(200);
            expect(response.data).to.have.keys('status');
            expect(response.data.status).to.be.equals('presence');
        });

        it('Must respond 3 as PRESENCE', async () => {
            predictorHelper.setResponses([
                [3]
            ]);

            const response = await axios.post(
                `http://localhost:3000/predict`,
                fixtures.input,
                { headers: { 'content-type': 'application/json' } }
            );

            expect(response.status).to.equals(200);
            expect(response.data).to.have.keys('status');
            expect(response.data.status).to.be.equals('presence');
        });

        it('Must respond 0 as ABSENCE', async () => {
            predictorHelper.setResponses([
                [0]
            ]);

            const response = await axios.post(
                `http://localhost:3000/predict`,
                fixtures.input,
                { headers: { 'content-type': 'application/json' } }
            );

            expect(response.status).to.equals(200);
            expect(response.data).to.have.keys('status');
            expect(response.data.status).to.be.equals('absence');
        });

        it('Must respond status 400 if some inputs aren\'t passed', async () => {
            predictorHelper.setResponses([
                [0]
            ]);

            const response = await axios.post(
                `http://localhost:3000/predict`,
                { ...fixtures.input, age: undefined },
                {
                    headers: { 'content-type': 'application/json' },
                    validateStatus: (status) => {
                        return status < 500;
                    }
                }
            );

            expect(response.status).to.equals(400);
        });

        it('Must access Healthcheck', async () => {
            const response = await axios.get(
                `${apiUrl}/healthcheck`
            );

            expect(response.status).to.equals(200);
            expect(response.data).to.have.keys('predictorIsReachable', 'version');
        });
    });