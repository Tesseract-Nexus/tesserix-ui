import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "storybook/test"

import { Button } from "../button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

const commandItems = [
  { value: "open-project", label: "Open Project", shortcut: "⌘O", keywords: ["project", "open"] },
  { value: "new-branch", label: "Create Branch", shortcut: "⌘B", keywords: ["git", "branch"] },
  { value: "deploy-prod", label: "Deploy to Production", shortcut: "⌘D", keywords: ["deploy", "release"] },
  { value: "open-settings", label: "Open Settings", shortcut: "⌘,", keywords: ["preferences", "settings"] },
]

const InlineCommandDemo = () => {
  const [selected, setSelected] = React.useState<string>("")
  const commandLabelByValue = React.useMemo(
    () =>
      commandItems.reduce<Record<string, string>>((acc, item) => {
        acc[item.value] = item.label
        return acc
      }, { help: "Help Center" }),
    []
  )

  return (
    <div className="space-y-4">
      <Command className="w-full" onValueChange={(value) => setSelected(commandLabelByValue[value] ?? value)}>
        <CommandInput aria-label="Search commands" placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandGroup>
            <div data-command-group-heading="">Quick Actions</div>
            {commandItems.map((item) => (
              <CommandItem key={item.value} value={item.value} keywords={item.keywords}>
                <span>{item.label}</span>
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <div data-command-group-heading="">Other</div>
            <CommandItem value="help" keywords={["docs", "support"]}>
              <span>Help Center</span>
              <CommandShortcut>F1</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <p className="text-sm text-foreground">Selected: {selected || "None"}</p>
    </div>
  )
}

const DialogCommandDemo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput aria-label="Type a command" placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              <div data-command-group-heading="">Navigation</div>
              <CommandItem value="go-dashboard" keywords={["dashboard"]} onClick={() => setOpen(false)}>
                Go to Dashboard
              </CommandItem>
              <CommandItem value="go-billing" keywords={["billing"]} onClick={() => setOpen(false)}>
                Go to Billing
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

const meta = {
  title: "Navigation/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Navigation</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Command Palette</h2>
          <p className="text-sm text-muted-foreground">Fast command execution with keyboard-friendly search.</p>
        </div>
        <InlineCommandDemo />
      </div>
    </div>
  ),
}

export const DialogMode: Story = {
  render: () => <DialogCommandDemo />,
}

export const KeyboardSelection: Story = {
  render: () => <InlineCommandDemo />,
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText(/search commands/i)

    fireEvent.change(input, { target: { value: "deploy" } })
    const option = canvas.getByRole("option", { name: /deploy to production/i })
    await expect(option).toBeInTheDocument()
    fireEvent.mouseEnter(option)

    const list = canvas.getByRole("listbox")
    list.focus()
    fireEvent.keyDown(list, { key: "ArrowDown" })
    fireEvent.keyDown(list, { key: "Enter" })

    await waitFor(() => {
      expect(canvas.getByText(/selected: deploy to production/i)).toBeInTheDocument()
    })
  },
}

export const EmptyResults: Story = {
  render: () => <InlineCommandDemo />,
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText(/search commands/i)
    fireEvent.change(input, { target: { value: "does-not-exist" } })
    await waitFor(() => {
      expect(canvas.queryAllByRole("option")).toHaveLength(0)
    })
  },
}

export const DialogInteraction: Story = {
  render: () => <DialogCommandDemo />,
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole("button", { name: /open command palette/i })
    fireEvent.click(openButton)

    const dialogInput = await waitFor(() => within(document.body).getByRole("textbox", { name: /type a command/i }))
    fireEvent.change(dialogInput, { target: { value: "billing" } })
    const billingOption = within(document.body).getByRole("option", { name: /go to billing/i })
    fireEvent.click(billingOption)

    await waitFor(() => {
      expect(within(document.body).queryByRole("textbox", { name: /type a command/i })).not.toBeInTheDocument()
    })
  },
}
