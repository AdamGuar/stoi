"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = exports.InputParameters = void 0;
var InputParameters = /** @class */ (function () {
    function InputParameters() {
    }
    return InputParameters;
}());
exports.InputParameters = InputParameters;
var Mode;
(function (Mode) {
    Mode[Mode["encrypt"] = 0] = "encrypt";
    Mode[Mode["decrypt"] = 1] = "decrypt";
    Mode[Mode["keygen"] = 2] = "keygen";
})(Mode || (Mode = {}));
exports.Mode = Mode;
//# sourceMappingURL=InputParameters.js.map