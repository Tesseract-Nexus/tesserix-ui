import { describe, expect, it, vi } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useMediaQuery } from "./use-media-query"

describe("useMediaQuery", () => {
  it("returns matchMedia state and responds to changes", () => {
    let listener: ((event: MediaQueryListEvent) => void) | undefined

    const addEventListener = vi.fn((_event: string, cb: (event: MediaQueryListEvent) => void) => {
      listener = cb
    })
    const removeEventListener = vi.fn()

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener,
        removeEventListener,
      })),
    })

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))

    expect(result.current).toBe(false)

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent)
    })

    expect(result.current).toBe(true)
    expect(addEventListener).toHaveBeenCalled()
  })
})
