import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { Autocomplete } from "./autocomplete"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
]

describe("Autocomplete", () => {
  it("filters options from text input", () => {
    render(<Autocomplete options={options} />)

    const input = screen.getByRole("combobox")
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: "rea" } })

    expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Vue" })).not.toBeInTheDocument()
  })

  it("calls onOptionSelect on option click", () => {
    const onOptionSelect = vi.fn()
    render(<Autocomplete options={options} onOptionSelect={onOptionSelect} />)

    const input = screen.getByRole("combobox")
    fireEvent.focus(input)
    fireEvent.click(screen.getByRole("option", { name: "React" }))

    expect(onOptionSelect).toHaveBeenCalledWith(options[0])
  })
})
