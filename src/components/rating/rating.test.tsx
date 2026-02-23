import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { Rating } from "./rating"

describe("Rating", () => {
  it("renders children", () => {
    render(<Rating>Hello</Rating>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
