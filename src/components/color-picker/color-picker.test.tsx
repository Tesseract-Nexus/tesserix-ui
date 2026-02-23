import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { ColorPicker } from "./color-picker"

describe("ColorPicker", () => {
  it("renders children", () => {
    render(<ColorPicker>Hello</ColorPicker>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
