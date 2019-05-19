"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pieces_1 = require("./pieces");
var ArrayHelpers = __importStar(require("./array_helpers"));
var black = 'black';
var white = 'white';
exports.initialBoard = createBoard();
function createBoard() {
    var board = [];
    board.push(createBlackKingRow());
    board.push(createPawnRow(black));
    board.push(createNullRow());
    board.push(createNullRow());
    board.push(createNullRow());
    board.push(createNullRow());
    board.push(createPawnRow(white));
    board.push(createWhiteKingRow());
    return board;
}
function createBlackKingRow() {
    return [
        new pieces_1.rook(black),
        new pieces_1.bishop(black),
        new pieces_1.knight(black),
        new pieces_1.king(black),
        new pieces_1.queen(black),
        new pieces_1.knight(black),
        new pieces_1.bishop(black),
        new pieces_1.rook(black),
    ];
}
function createWhiteKingRow() {
    return [
        new pieces_1.rook(white),
        new pieces_1.bishop(white),
        new pieces_1.knight(white),
        new pieces_1.queen(white),
        new pieces_1.king(white),
        new pieces_1.knight(white),
        new pieces_1.bishop(white),
        new pieces_1.rook(white),
    ];
}
function createPawnRow(color) {
    return Array.apply(null, Array(8)).map(function () {
        return new pieces_1.pawn(color);
    });
}
function createNullRow() {
    return Array.apply(null, Array(8)).map(function () {
        return new pieces_1.nullPiece();
    });
}
function playerPieces(board, color) {
    var pieces = [];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var piece = board[i][j];
            if (piece.color === color) {
                var tile = { rowIdx: i, colIdx: j };
                var pieceWithTile = { piece: piece, tile: tile };
                pieces.push(pieceWithTile);
            }
        }
    }
    return pieces;
}
exports.playerPieces = playerPieces;
function getPiece(board, tile) {
    return board[tile.rowIdx][tile.colIdx];
}
exports.getPiece = getPiece;
function validMoves(piece, tile) {
    return piece.moves
        .map(function (move) {
        return { rowIdx: move[0] + tile.rowIdx, colIdx: move[1] + tile.colIdx };
    })
        .filter(function (move) {
        return isOnBoard(move);
    });
}
exports.validMoves = validMoves;
function isOnBoard(tile) {
    return (tile.rowIdx >= 0 && tile.rowIdx < 8 && tile.colIdx >= 0 && tile.colIdx < 8);
}
function updateBoard(oldBoard, fromTile, toTile) {
    var fromRow = fromTile.rowIdx, fromCol = fromTile.colIdx;
    var toRow = toTile.rowIdx, toCol = toTile.colIdx;
    var oldPiece = oldBoard[fromRow][fromCol];
    if (oldPiece.isPiece) {
        var newBoard = ArrayHelpers.deepDup(oldBoard);
        newBoard[toRow][toCol] = oldPiece;
        newBoard[fromRow][fromCol] = new pieces_1.nullPiece();
        return newBoard;
    }
    else {
        return oldBoard;
    }
}
exports.updateBoard = updateBoard;
function validMove(board, fromTile, toTile) {
    var fromRowIdx = fromTile.rowIdx, fromColIdx = fromTile.colIdx;
    var toRowIdx = toTile.rowIdx, toColIdx = toTile.colIdx;
    var _a = board[fromRowIdx][fromColIdx], moves = _a.moves, color = _a.color;
    var availableTiles;
    if (color === black) {
        availableTiles = moves.map(function (move) { return ({
            rowIdx: fromRowIdx + move[0],
            colIdx: fromColIdx + move[1],
        }); });
    }
    else {
        availableTiles = moves.map(function (move) { return ({
            rowIdx: fromRowIdx - move[0],
            colIdx: fromColIdx + move[1],
        }); });
    }
    return ArrayHelpers.contains(availableTiles, toTile);
}
exports.validMove = validMove;
function sample(array) {
    return array.length === 0 ? null : array[getRandomInt(array.length)];
}
exports.sample = sample;
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
