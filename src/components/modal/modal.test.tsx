import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { Modal } from "./modal"

describe("Modal", () => {
  it("renders children", () => {
    render(<Modal>Hello</Modal>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
