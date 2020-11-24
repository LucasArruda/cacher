var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cacher", "express"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cacher_1 = __importDefault(require("./cacher"));
    var express_1 = __importDefault(require("express"));
    var API_URL = '/api/v1/';
    var app = express_1.default();
    cacher_1.default.set('test', 'oi');
    console.log('testing', cacher_1.default.get('test'));
    var ok = function (obj) { return (typeof obj !== 'undefined') && obj !== null; };
    app.get(API_URL + "get/:key", function (req, res) {
        var key = req.params.key;
        var result = cacher_1.default.get(key);
        if (ok(result)) {
            res.status(200).send({
                success: 'true',
                message: 'Object retrieved',
                result: result
            });
        }
        else {
            res.status(404).send({
                success: 'false',
                message: 'Object not found',
                error: "Object was not found with key: " + key
            });
        }
    });
    app.get(API_URL + "has/:key", function (req, res) {
        var key = req.params.key;
        var result = cacher_1.default.has(key);
        res.status(200).send({
            success: 'true',
            message: result ? 'Object found' : 'Object not found',
            result: result ? 'Object found' : 'Object not found'
        });
    });
    app.post(API_URL + "set", function (req, res) {
        var key = req.body.key;
        var value = req.body.value;
        cacher_1.default.set(key, value);
        res.status(200).send({
            success: 'true'
        });
    });
    var PORT = 5000;
    app.listen(PORT, function () {
        console.log("server running on port " + PORT);
    });
});
//# sourceMappingURL=index.js.map