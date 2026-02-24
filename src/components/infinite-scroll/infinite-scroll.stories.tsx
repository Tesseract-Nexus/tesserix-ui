import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { InfiniteScroll } from "./infinite-scroll"

const meta = {
  title: "Data Display/InfiniteScroll",
  component: InfiniteScroll,
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteScroll>

export default meta
type Story = StoryObj<typeof meta>

const baseItems = ["Item A", "Item B", "Item C"]

export const Default: Story = {
  render: () => (
    <InfiniteScroll
      items={baseItems}
      hasMore={false}
      onLoadMore={() => {}}
      renderItem={(item) => <div className="rounded border p-2">{item}</div>}
    />
  ),
}

export const LoadingState: Story = {
  render: () => (
    <InfiniteScroll
      items={baseItems}
      hasMore
      loading
      loader={<div className="rounded border border-dashed p-2 text-sm">Loading next page...</div>}
      onLoadMore={() => {}}
      renderItem={(item) => <div className="rounded border p-2">{item}</div>}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Loading next page...")).toBeInTheDocument()
  },
}

export const EndMessage: Story = {
  render: () => (
    <InfiniteScroll
      items={baseItems}
      hasMore={false}
      endMessage={<div className="text-sm text-muted-foreground">All items loaded</div>}
      onLoadMore={() => {}}
      renderItem={(item) => <div className="rounded border p-2">{item}</div>}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("All items loaded")).toBeInTheDocument()
  },
}

export const ControlledPagination: Story = {
  render: () => {
    const [items, setItems] = React.useState(baseItems)
    const [hasMore, setHasMore] = React.useState(false)

    return (
      <div className="w-80 space-y-2">
        <InfiniteScroll
          items={items}
          hasMore={hasMore}
          onLoadMore={() => {
            setItems((current) => [...current, `Item ${String.fromCharCode(68 + current.length - 3)}`])
            setHasMore(false)
          }}
          renderItem={(item) => <div className="rounded border p-2">{item}</div>}
        />
        <button
          type="button"
          className="rounded border px-2 py-1 text-xs"
          onClick={() => {
            setItems((current) => [...current, "Item D"])
            setHasMore(false)
          }}
        >
          Simulate load
        </button>
        <p className="text-xs text-muted-foreground">Count: {items.length}</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Simulate load" }))
    await waitFor(() => {
      expect(canvas.getByText(/Count: 4/i)).toBeInTheDocument()
    })
  },
}
