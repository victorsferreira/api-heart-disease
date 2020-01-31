var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var serverless = require('serverless-http');
var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/api/info', function (req, res) {
    res.send({ application: 'sample-app', version: '1' });
});
app.post('/api/v1/getback', function (req, res) {
    res.send(__assign({}, req.body));
});
module.exports.handler = serverless(app);
//# sourceMappingURL=index.js.map