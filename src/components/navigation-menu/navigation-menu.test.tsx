import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { NavigationMenu } from "./navigation-menu"

describe("NavigationMenu", () => {
  it("renders children", () => {
    render(<NavigationMenu>Hello</NavigationMenu>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
