(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cacher = /** @class */ (function () {
        function Cacher() {
        }
        Cacher.set = function (key, obj) {
            this.map.set(key, obj);
        };
        Cacher.get = function (key) {
            return this.map.get(key);
        };
        Cacher.has = function (key) {
            return this.map.has(key);
        };
        Cacher.remove = function (key) {
            if (!this.has(key))
                return false;
            return this.map.delete(key);
        };
        Cacher.map = new Map();
        return Cacher;
    }());
    exports.default = Cacher;
});
//# sourceMappingURL=cacher.js.map