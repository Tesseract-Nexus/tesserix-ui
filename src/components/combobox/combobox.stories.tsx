import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, within } from "storybook/test"

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
    fireEvent.keyDown(input, { key: "ArrowDown" })
    await expect(input).toHaveAttribute("aria-expanded", "true")
    fireEvent.keyDown(input, { key: "Enter" })

    await expect(input).toHaveValue("React")

    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: "next" } })
    await expect(within(document.body).getByRole("option", { name: /next\.js/i })).toBeInTheDocument()

    fireEvent.keyDown(input, { key: "Escape" })
    await expect(input).toHaveAttribute("aria-expanded", "false")
  },
}
