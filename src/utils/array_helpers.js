export function updateBoard(oldBoard, from_x, from_y, to_x, to_y) {
  if (oldBoard[from_y][from_x] === 1) {
    newBoard = deepDup(oldBoard)

    newBoard[to_y][to_x] = 1
    newBoard[from_y][from_x] = 0

    return newBoard
  } else {
    return oldBoard
  }
}

function deepDup(array) {
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
