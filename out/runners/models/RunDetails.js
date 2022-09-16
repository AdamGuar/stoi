"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.RunDetails = void 0;
var RunDetails = /** @class */ (function () {
    function RunDetails(status, details) {
        this.status = status;
        this.detais = details;
    }
    return RunDetails;
}());
exports.RunDetails = RunDetails;
var Status;
(function (Status) {
    Status[Status["Ok"] = 0] = "Ok";
    Status[Status["Fail"] = 1] = "Fail";
})(Status || (Status = {}));
exports.Status = Status;
//# sourceMappingURL=RunDetails.js.map