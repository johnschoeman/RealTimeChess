import { Tile } from "./game_helpers"

export function deepDup(array: any[]) {
  const newArray = []
  for (let i = 0; i < array.length; i++) {
    const row = []
    for (let j = 0; j < array[i].length; j++) {
      row.push(array[i][j])
    }
    newArray.push(row)
  }
  return newArray
}

export function contains(array: any[], tile: Tile) {
  let result = false
  array.forEach(el => {
    if (el.rowIdx === tile.rowIdx && el.colIdx === tile.colIdx) {
      result = true
    }
  })
  return result
}

export function sample<T>(array: Array<T>): T | null {
  return array.length === 0 ? null : array[getRandomInt(array.length)]
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function reverse<T>(array: Array<T>): Array<T> {
  return array.slice().reverse()
}
