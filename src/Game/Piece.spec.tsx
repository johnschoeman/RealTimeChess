import React from "react"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import Piece from "./Piece"
import { rook } from "../utils/pieces"

afterEach(cleanup)

describe("Piece", () => {
  test("it renders with a provided piece prop", () => {
    const piece = new rook("b")
    const tile = { rowIdx: 0, colIdx: 0 }
    const selected = false
    const { getByTestId } = render(
      <Piece
        piece={piece}
        tile={tile}
        isSelected={selected}
        selectUserTile={() => {}}
        testID={"rook"}
      />
    )

    expect(getByTestId("rook")).toBeDefined()
  })
})
