const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const isReachable = require('is-reachable');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const HEART_DISEASE_RESULT = {
    0: 'absence',
    1: 'presence',
    2: 'presence',
    3: 'presence',
};

async function predictorProvider(data) {
    try {
        const url = `${process.env.PROVIDER_URL}/predict`;

        console.log("URL:", url);
        const response = await axios.post(
            url,
            data
        );

        return response.data;
    } catch (e) {
        throw e;
    }
}

function predictResponseBuilder(status) {
    return {
        status,
        description: HEART_DISEASE_RESULT[status]
    };
}

function serverIsReachable() {
    try {
        const isIt = await isReachable('ip-172-31-82-220.ec2.internal:5000');
        console.log("Is reachable: ", isIt);
        res.send(`Is reachable: ${isIt}`);
    } catch (e) {
        throw e;
    }
}

app.get('/api', async (req, res) => {
    try {
        const result = await predictorProvider({ a: 1, b: 2 });
        const diseaseStatus = result[0];

        const response = predictResponseBuilder(diseaseStatus);

        res
        .status(200)
        .send(response);
        
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.get('/foo', async (req, res) => {
    console.log(Date.now());

    try {
        const result = serverIsReachable();
        const response = `Is reachable? ${result}`;

        res
        .status(200)
        .send(response);
        
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.use((err, req, res) => {
    console.log(err.message);
    res.status(500).send(err.stack);
});

module.exports.handler = serverless(app);
// // Or
// const handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   // you can do other things here
//   const result = await handler(event, context);
//   // and here
//   return result;
// };