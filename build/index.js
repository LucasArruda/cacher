var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cacher", "express", "body-parser"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cacher_1 = __importDefault(require("./cacher"));
    var express_1 = __importDefault(require("express"));
    var body_parser_1 = __importDefault(require("body-parser"));
    var API_URL = '/api/v1/';
    var app = express_1.default();
    // create application/json parser
    var jsonParser = body_parser_1.default.json();
    // create application/x-www-form-urlencoded parser
    var urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
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
    app.post(API_URL + "set", jsonParser, function (req, res) {
        var key = req.body.key;
        var value = req.body.value;
        console.log('key', key);
        console.log('key', key);
        cacher_1.default.set(key, value);
        res.status(200).send({
            success: 'true'
        });
    });
    app.delete(API_URL + "remove/:key", function (req, res) {
        var key = req.params.key;
        var result = cacher_1.default.del(key);
        if (ok(result)) {
            res.status(200).send({
                success: 'true',
                message: 'Object deleted'
            });
        }
        else {
            res.status(404).send({
                success: 'false',
                message: 'Object not found or could not be deleted',
                error: "Object with key \"" + key + "\" was not found or could not be deleted"
            });
        }
    });
    if (process.env.NODE_ENV === "dev") {
        var PORT_1 = 5000;
        app.listen(PORT_1, function () {
            console.log("server running on port " + PORT_1);
        });
    }
    module.exports = app;
});
//# sourceMappingURL=index.js.map