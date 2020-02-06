import express = require("express");
import routes from './routes';
import serverless = require("serverless-http");
import * as bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

// const HEART_DISEASE_RESULT = {
//     0: 'absence',
//     1: 'presence',
//     2: 'presence',
//     3: 'presence',
// };

// async function predictorProvider(data) {
//     try {
//         const url = `${process.env.PROVIDER_URL}/predict`;

//         console.log("URL:", url);
//         const response = await axios.post(
//             url,
//             data
//         );

//         return response.data;
//     } catch (e) {
//         console.log(`Error: ${e.message}`);
//         throw e;
//     }
// }

// function predictResponseBuilder(status) {
//     return {
//         status,
//         description: HEART_DISEASE_RESULT[status]
//     };
// }

// async function serverIsReachable() {
//     try {
//         const isIt = await isReachable('ip-172-31-82-220.ec2.internal:5000');
//         console.log(`Is reachable ${process.env.PROVIDER_URL}: ${isIt}`);
//         return isIt;
//     } catch (e) {
//         throw e;
//     }
// }

// app.get('/api', async (req, res) => {
//     try {
//         console.log("Starting to process /api");
//         const result = await predictorProvider({ a: 1, b: 2 });
//         console.log("Got prediction", result);
//         const diseaseStatus = result[0];
//         // console.log('predictorProvider', result);
//         const response = predictResponseBuilder(diseaseStatus);

//         res
//             .status(200)
//             .json(response);

//     } catch (e) {
//         console.log(`Error: ${e.message}`);
//         res.status(500).json("Error");
//     }
// });

// app.get('/foo', async (_req, res) => {
//     console.log(Date.now());

//     try {
//         const result = await serverIsReachable();
//         const response = `Is reachable? ${result}`;

//         res
//             .status(200)
//             .json(response);

//     } catch (e) {
//         console.log(`Error: ${e.message}`);
//         res.status(500).json("Error");
//     }
// });

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.log(`Error found: ${err.message}`);
    res.status(500).json(err.stack);
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