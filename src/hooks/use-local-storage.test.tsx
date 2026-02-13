import { describe, expect, it } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useLocalStorage } from "./use-local-storage"

describe("useLocalStorage", () => {
  it("reads and writes localStorage", () => {
    window.localStorage.clear()

    const { result } = renderHook(() => useLocalStorage("theme", "light"))
    expect(result.current[0]).toBe("light")

    act(() => {
      result.current[1]("dark")
    })

    expect(result.current[0]).toBe("dark")
    expect(window.localStorage.getItem("theme")).toBe("\"dark\"")
  })

  it("supports updater function", () => {
    window.localStorage.clear()

    const { result } = renderHook(() => useLocalStorage("count", 0))

    act(() => {
      result.current[1]((count) => count + 1)
    })

    expect(result.current[0]).toBe(1)
  })
})
