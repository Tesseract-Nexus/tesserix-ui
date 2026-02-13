import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent } from "storybook/test"

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "./context-menu"

const InteractiveContextMenu = () => {
  const [lastAction, setLastAction] = React.useState("None")

  return (
    <div className="space-y-4">
      <ContextMenu>
        <ContextMenuTrigger className="rounded-xl border bg-card p-6 text-sm text-card-foreground">
          Right-click this panel to open menu
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem onClick={() => setLastAction("Open")}>
            Open
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => setLastAction("Rename")}>
            Rename
            <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => setLastAction("Delete")} className="text-destructive">
            Delete
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="text-sm text-muted-foreground">Last action: {lastAction}</p>
    </div>
  )
}

const meta = {
  title: "Navigation/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Navigation</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Context Menu Showcase</h2>
          <p className="text-sm text-muted-foreground">Right-click actions for contextual workflows.</p>
        </div>
        <InteractiveContextMenu />
      </div>
    </div>
  ),
}

export const RightClickAction: Story = {
  render: () => <InteractiveContextMenu />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByText(/right-click this panel/i)
    fireEvent.contextMenu(trigger, { clientX: 120, clientY: 120 })

    const rename = canvas.getByRole("menuitem", { name: /rename/i })
    fireEvent.click(rename)

    await expect(canvas.getByText(/last action: rename/i)).toBeInTheDocument()
  },
}

