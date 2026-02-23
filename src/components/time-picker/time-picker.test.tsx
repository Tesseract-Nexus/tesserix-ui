import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { TimePicker } from "./time-picker"

describe("TimePicker", () => {
  it("renders children", () => {
    render(<TimePicker>Hello</TimePicker>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
