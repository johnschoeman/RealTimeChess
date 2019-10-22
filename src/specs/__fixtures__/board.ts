import {
  rook,
  knight,
  bishop,
  queen,
  king,
  pawn,
  empty,
} from "../../utils/pieces"
import { black, white } from "../../utils/chess/chess"

import { Board } from "../../utils/game_helpers"

const r = () => new rook(black)
const n = () => new knight(black)
const b = () => new bishop(black)
const q = () => new queen(black)
const k = () => new king(black)
const p = () => new pawn(black)

const R = () => new rook(white)
const N = () => new knight(white)
const B = () => new bishop(white)
const Q = () => new queen(white)
const K = () => new king(white)
const P = () => new pawn(white)

const _ = () => new empty()

export const initialBoard: Board = [
  [r(), n(), b(), q(), k(), b(), n(), r()],
  [p(), p(), p(), p(), p(), p(), p(), p()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [P(), P(), P(), P(), P(), P(), P(), P()],
  [R(), N(), B(), Q(), K(), B(), N(), R()],
]

export const boardWithMoves: Board = [
  [r(), n(), b(), q(), k(), b(), n(), r()],
  [p(), p(), _(), p(), p(), p(), p(), p()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), p(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), P(), _(), _(), _()],
  [_(), _(), _(), _(), _(), N(), _(), _()],
  [P(), P(), P(), P(), P(), _(), P(), P()],
  [R(), N(), B(), Q(), K(), B(), _(), R()],
]

export const blackWonGame: Board = [
  [r(), n(), b(), _(), k(), b(), n(), r()],
  [p(), p(), p(), p(), p(), p(), p(), p()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [P(), P(), P(), P(), P(), P(), P(), P()],
  [R(), N(), B(), Q(), q(), B(), N(), R()],
]

export const whiteWonGame: Board = [
  [r(), n(), b(), q(), Q(), b(), n(), r()],
  [p(), p(), p(), p(), p(), p(), p(), p()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [_(), _(), _(), _(), _(), _(), _(), _()],
  [P(), P(), P(), P(), P(), P(), P(), P()],
  [R(), N(), B(), _(), K(), B(), N(), R()],
]
