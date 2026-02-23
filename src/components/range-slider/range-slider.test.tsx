import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { RangeSlider } from "./range-slider"

describe("RangeSlider", () => {
  it("renders children", () => {
    render(<RangeSlider>Hello</RangeSlider>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
