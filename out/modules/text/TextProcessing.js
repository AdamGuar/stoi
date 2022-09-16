"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessing = void 0;
var TextProcessing = /** @class */ (function () {
    function TextProcessing() {
    }
    TextProcessing.toByteArray = function (text) {
        text = text + '*';
        var resultArray = [];
        Buffer.from(text, 'utf-8').forEach(function (element) {
            resultArray.push(element);
        });
        return resultArray;
    };
    return TextProcessing;
}());
exports.TextProcessing = TextProcessing;
//# sourceMappingURL=TextProcessing.js.map