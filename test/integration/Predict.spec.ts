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
            try {
                const response = await axios.post(
                    `${apiUrl}/predict`,
                    fixtures.input,
                    { headers: { 'content-type': 'application/json' } }
                );

                console.log(response.status);
            } catch (e) {
                console.log(e);
            }


            // console.log(response)
        });

        it('Must respond 1 as PRESENCE', async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/healthcheck`,
                    fixtures.input,
                    { headers: { 'content-type': 'application/json' } }
                );

                console.log(response.status);
            } catch (e) {
                console.log(e);
            }


            // console.log(response)
        });

        xit('Must respond 2 as PRESENCE', () => {

        });

        xit('Must respond 3 as PRESENCE', () => {

        });

        xit('Must respond 3 as PRESENCE', () => {

        });

        xit('Must respond 0 as ABSENCE', () => {

        });
    });