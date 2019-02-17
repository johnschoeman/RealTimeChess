export function deepDup(array) {
  newArray = []
  for (let i = 0; i < array.length; i++) {
    row = []
    for (let j = 0; j < array[i].length; j++) {
      row.push(array[i][j])
    }
    newArray.push(row)
  }
  return newArray
}

export function contains(array, tile) {
  let result = false
  array.forEach(el => {
    if (el.rowIdx === tile.rowIdx && el.colIdx === tile.colIdx) {
      result = true
    }
  })
  return result
}
