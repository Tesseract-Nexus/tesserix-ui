import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "storybook/test"

import { Combobox } from "./combobox"

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    options: frameworkOptions,
    placeholder: "Choose framework",
    searchPlaceholder: "Search framework...",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const ControlledComboboxDemo = () => {
  const [value, setValue] = React.useState("nextjs")

  return (
    <div className="w-[420px] space-y-2">
      <label className="text-sm font-medium text-card-foreground">Controlled framework</label>
      <Combobox
        options={frameworkOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Choose framework"
        searchPlaceholder="Search framework..."
      />
      <p className="text-sm text-muted-foreground">Current value: {value}</p>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Forms</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Combobox Showcase</h2>
          <p className="text-sm text-muted-foreground">Searchable selection input with keyboard navigation.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Frontend Framework</label>
            <Combobox {...args} />
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ArrowUp</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ArrowDown</code>, and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">Enter</code> for keyboard selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const KeyboardSelection: Story = {
  render: (args) => (
    <div className="w-[420px]">
      <Combobox {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox")

    await expect(input).toHaveAttribute("aria-expanded", "false")
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: "ArrowDown" })
    await waitFor(() => {
      expect(input).toHaveAttribute("aria-expanded", "true")
    })
    await waitFor(() => {
      expect(within(document.body).getByRole("option", { name: /react/i })).toBeInTheDocument()
    })
    fireEvent.keyDown(input, { key: "Enter" })

    await waitFor(() => {
      expect(input).toHaveValue("React")
    })

    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: "next" } })
    await expect(within(document.body).getByRole("option", { name: /next\.js/i })).toBeInTheDocument()

    fireEvent.keyDown(input, { key: "Escape" })
    await waitFor(() => {
      expect(input).toHaveAttribute("aria-expanded", "false")
    })
  },
}

export const Controlled: Story = {
  render: () => <ControlledComboboxDemo />,
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox")
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: "vue" } })

    const vueOption = await waitFor(() => within(document.body).getByRole("option", { name: /vue/i }))
    fireEvent.click(vueOption)

    await waitFor(() => {
      expect(canvas.getByText(/current value: vue/i)).toBeInTheDocument()
    })
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[420px] space-y-2">
      <label className="text-sm font-medium text-card-foreground">Disabled combobox</label>
      <Combobox options={frameworkOptions} disabled placeholder="Unavailable" />
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox")
    await expect(input).toBeDisabled()
  },
}
