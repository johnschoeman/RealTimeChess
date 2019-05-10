"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("../styles");
var nullPiece = function nullPiece() {
    this.color = '';
    this.isPiece = false;
    this.name = 'Null';
    this.style = {};
    this.moves = [];
};
exports.nullPiece = nullPiece;
var pawn = function pawn(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'Pawn';
    this.style = {
        backgroundColor: color,
        borderWidth: 2,
        borderRadius: 15,
        width: 20,
        maxHeight: 20,
        borderColor: styles_1.Color.pieceBorder,
    };
    this.moves = [[1, 0]];
};
exports.pawn = pawn;
var knight = function knight(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'Knight';
    this.style = {
        backgroundColor: color,
        borderWidth: 2,
        borderRadius: 6,
        width: 20,
        borderColor: styles_1.Color.pieceBorder,
    };
    this.moves = [
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
    ];
};
exports.knight = knight;
var bishop = function bishop(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'Bishop';
    this.style = {
        backgroundColor: color,
        width: 15,
        maxHeight: 25,
        borderWidth: 2,
        transform: [{ skewX: '135deg' }],
    };
    this.moves = generateBishopMoves();
};
exports.bishop = bishop;
var rook = function rook(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'Rook';
    this.style = {
        backgroundColor: color,
        borderWidth: 2,
        width: 25,
        height: 30,
    };
    this.moves = generateRookMoves();
};
exports.rook = rook;
var queen = function queen(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'Queen';
    this.style = {
        backgroundColor: color,
        borderWidth: 2,
        transform: [{ rotate: '45deg' }],
        width: 25,
        maxHeight: 25,
    };
    this.moves = generateQueenMoves();
};
exports.queen = queen;
var king = function king(color) {
    this.color = color;
    this.isPiece = true;
    this.name = 'King';
    this.style = {
        backgroundColor: color,
        borderWidth: 15,
        borderLeftColor: styles_1.Color.tileBlack,
        borderRightColor: styles_1.Color.tileBlack,
        borderTopColor: color,
        borderBottomColor: color,
    };
    this.moves = [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [0, -1],
        [-1, -1],
        [0, -1],
        [1, -1],
    ];
};
exports.king = king;
function generateQueenMoves() {
    var moves = [];
    for (var i = 0; i < 8; i++) {
        moves.push([i, 0]);
        moves.push([-i, 0]);
        moves.push([0, i]);
        moves.push([0, -i]);
        moves.push([i, i]);
        moves.push([-i, i]);
        moves.push([i, -i]);
        moves.push([-i, -i]);
    }
    return moves;
}
function generateBishopMoves() {
    var moves = [];
    for (var i = 0; i < 8; i++) {
        moves.push([i, i]);
        moves.push([-i, i]);
        moves.push([i, -i]);
        moves.push([-i, -i]);
    }
    return moves;
}
function generateRookMoves() {
    var moves = [];
    for (var i = 0; i < 8; i++) {
        moves.push([0, i]);
        moves.push([0, -i]);
        moves.push([i, 0]);
        moves.push([-i, 0]);
    }
    return moves;
}
