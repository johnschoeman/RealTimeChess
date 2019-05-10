import { Tile } from './game_helpers'

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
