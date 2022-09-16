"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgProcessor = void 0;
var _a = require('canvas'), createCanvas = _a.createCanvas, loadImage = _a.loadImage;
var fs = require('fs');
var pixelPositions_json_1 = __importDefault(require("../../configs/pixelPositions.json"));
var ImgProcessor = /** @class */ (function () {
    function ImgProcessor() {
    }
    ImgProcessor.prototype.loadImage = function (imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, loadImage(imagePath)];
                    case 1:
                        _a.image = _b.sent();
                        this.width = this.image.naturalWidth;
                        this.height = this.image.naturalHeight;
                        this.canvas = createCanvas(this.width, this.height);
                        this.ctx = this.canvas.getContext('2d');
                        this.ctx.drawImage(this.image, 0, 0);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        throw {
                            message: 'Unable to load image',
                            reason: error_1,
                        };
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImgProcessor.prototype.addArrayToCanvas = function (input) {
        var _this = this;
        var toPut = input.map(function (numberToPut, index) {
            var data = pixelPositions_json_1.default[index];
            data.value = numberToPut;
            return data;
        });
        toPut.forEach(function (element) {
            _this.ctx.fillStyle = "rgb(".concat(element.value, ",0,0)");
            _this.ctx.fillRect(element.x, element.y, 1, 1);
        });
    };
    ImgProcessor.prototype.readByteArrayFromCanvas = function () {
        var result = [];
        for (var i = 0; i < pixelPositions_json_1.default.length; i++) {
            var position = pixelPositions_json_1.default[i];
            var pixel = this.ctx.getImageData(position.x, position.y, 1, 1);
            var rgb = pixel.data;
            if (rgb[0] == 42)
                break;
            result.push(rgb[0]);
        }
        return result;
    };
    ImgProcessor.prototype.addTextToImmage = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '11pt';
                this.ctx.fillText(text, this.width / 2, this.height / 2);
                return [2 /*return*/];
            });
        });
    };
    ImgProcessor.prototype.saveCanvas = function () {
        var buffer = this.canvas.toBuffer('image/png');
        fs.writeFileSync('./imagesOutput/test.png', buffer);
    };
    ImgProcessor.prototype.getImg = function () {
        return this.image;
    };
    return ImgProcessor;
}());
exports.ImgProcessor = ImgProcessor;
//# sourceMappingURL=ImgProcessor.js.map