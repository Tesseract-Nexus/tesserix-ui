import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { Form } from "./form"

describe("Form", () => {
  it("renders children", () => {
    render(<Form>Hello</Form>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
