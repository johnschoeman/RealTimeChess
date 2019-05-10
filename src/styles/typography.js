"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Color = __importStar(require("./color"));
exports.baseFontSize = 12;
exports.largeFontSize = 24;
exports.helvetica = 'Helvetica-Bold';
var baseFont = exports.helvetica;
exports.landing = {
    color: Color.white,
    fontSize: exports.largeFontSize,
    paddingBottom: 12,
    fontFamily: baseFont,
};
exports.mainButton = {
    color: Color.black,
    fontSize: exports.largeFontSize,
    fontFamily: baseFont,
};
