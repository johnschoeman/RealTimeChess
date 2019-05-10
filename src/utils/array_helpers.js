"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepDup(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        var row = [];
        for (var j = 0; j < array[i].length; j++) {
            row.push(array[i][j]);
        }
        newArray.push(row);
    }
    return newArray;
}
exports.deepDup = deepDup;
function contains(array, tile) {
    var result = false;
    array.forEach(function (el) {
        if (el.rowIdx === tile.rowIdx && el.colIdx === tile.colIdx) {
            result = true;
        }
    });
    return result;
}
exports.contains = contains;
