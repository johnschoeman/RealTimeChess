import React from "react"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import Piece from "./Piece"
import { rook } from "../utils/pieces"

afterEach(cleanup)

describe("Piece", () => {
  test("it renders with a provided piece prop", () => {
    const piece = new rook("b")
    const { getByTestId } = render(<Piece piece={piece} testID={"rook"} />)

    expect(getByTestId("rook")).toBeDefined()
  })
})
