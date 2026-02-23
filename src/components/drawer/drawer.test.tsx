import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { Drawer } from "./drawer"

describe("Drawer", () => {
  it("renders children", () => {
    render(<Drawer>Hello</Drawer>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
