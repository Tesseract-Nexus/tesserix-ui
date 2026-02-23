import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { Resizable } from "./resizable"

describe("Resizable", () => {
  it("renders children", () => {
    render(<Resizable>Hello</Resizable>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
