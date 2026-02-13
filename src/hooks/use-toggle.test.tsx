import { describe, expect, it } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useToggle } from "./use-toggle"

describe("useToggle", () => {
  it("toggles value", () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current.value).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(true)
  })

  it("supports setTrue and setFalse", () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current.setFalse()
    })
    expect(result.current.value).toBe(false)

    act(() => {
      result.current.setTrue()
    })
    expect(result.current.value).toBe(true)
  })
})
