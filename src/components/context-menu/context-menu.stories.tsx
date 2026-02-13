import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "storybook/test"

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
      <p className="text-sm text-foreground">Last action: {lastAction}</p>
    </div>
  )
}

const ControlledContextMenuDemo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <ContextMenu open={open} onOpenChange={setOpen}>
        <ContextMenuTrigger className="rounded-xl border bg-card p-6 text-sm text-card-foreground">
          Controlled menu trigger
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setOpen(false)}>Inspect</ContextMenuItem>
          <ContextMenuItem onClick={() => setOpen(false)}>Copy link</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="text-sm text-foreground">Menu open: {open ? "yes" : "no"}</p>
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
    trigger.focus()
    fireEvent.keyDown(trigger, { key: "F10", shiftKey: true })

    const rename = await waitFor(() =>
      within(document.body).getByRole("menuitem", { name: /rename/i })
    )
    fireEvent.click(rename)

    await waitFor(() => {
      expect(canvas.getByText(/last action: rename/i)).toBeInTheDocument()
    })
  },
}

export const Controlled: Story = {
  render: () => <ControlledContextMenuDemo />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByText(/controlled menu trigger/i)
    trigger.focus()
    fireEvent.keyDown(trigger, { key: "F10", shiftKey: true })

    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument()
      expect(canvas.getByText(/menu open: yes/i)).toBeInTheDocument()
    })

    fireEvent.click(within(document.body).getByRole("menuitem", { name: /inspect/i }))
    await waitFor(() => {
      expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument()
      expect(canvas.getByText(/menu open: no/i)).toBeInTheDocument()
    })
  },
}
