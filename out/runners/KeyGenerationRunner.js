"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyGeneratorRunner = void 0;
var RunDetails_1 = require("./models/RunDetails");
var InputParameters_1 = require("./models/InputParameters");
var randomstring_1 = __importDefault(require("randomstring"));
var PublicKey_1 = require("./models/PublicKey");
var fs_1 = require("fs");
var MAX_LENGTH = 280;
var KeyGeneratorRunner = /** @class */ (function () {
    function KeyGeneratorRunner() {
    }
    KeyGeneratorRunner.prototype.shouldRun = function (inputParameters) {
        return inputParameters.mode == InputParameters_1.Mode.keygen;
    };
    ;
    KeyGeneratorRunner.prototype.run = function (inputParameters) {
        try {
            var boundary = this.getBoundary(inputParameters.boundary);
            var maxLength = MAX_LENGTH;
            var positions = new Set();
            while (positions.size < maxLength) {
                var pixelPosition = {
                    x: this.getRandomInt(boundary[0]),
                    y: this.getRandomInt(boundary[1]),
                    value: 0
                };
                positions.add(JSON.stringify(pixelPosition));
            }
            var result = Array.from(positions).map(function (el) {
                var parsed = JSON.parse(el);
                return parsed;
            });
            var publicKey = new PublicKey_1.PublicKey(result, randomstring_1.default.generate());
            (0, fs_1.writeFileSync)(inputParameters.publicKeyOut, JSON.stringify(publicKey));
            return new RunDetails_1.RunDetails(RunDetails_1.Status.Ok, "Key generated, saved to location ".concat(inputParameters.publicKeyOut));
        }
        catch (error) {
            return new RunDetails_1.RunDetails(RunDetails_1.Status.Fail, error);
        }
    };
    ;
    KeyGeneratorRunner.prototype.getBoundary = function (boundaryParam) {
        var result = new Array(2);
        try {
            var splited = boundaryParam.split('x');
            result[0] = parseInt(splited[0]);
            result[1] = parseInt(splited[1]);
        }
        catch (error) {
            throw 'Unable to parse boundary parameter, please check boundary parameter';
        }
        return result;
    };
    KeyGeneratorRunner.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    };
    return KeyGeneratorRunner;
}());
exports.KeyGeneratorRunner = KeyGeneratorRunner;
//# sourceMappingURL=KeyGenerationRunner.js.map