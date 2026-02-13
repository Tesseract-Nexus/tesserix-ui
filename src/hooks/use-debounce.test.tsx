import { describe, expect, it, vi } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useDebounce } from "./use-debounce"

describe("useDebounce", () => {
  it("delays value updates", () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: "a" },
    })

    expect(result.current).toBe("a")

    rerender({ value: "ab" })
    expect(result.current).toBe("a")

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe("ab")
    vi.useRealTimers()
  })
})
