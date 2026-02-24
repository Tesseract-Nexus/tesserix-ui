import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { Autocomplete } from "./autocomplete"

const options = [
  { value: "react", label: "React", keywords: ["ui", "frontend"] },
  { value: "next", label: "Next.js", keywords: ["react", "framework"] },
  { value: "vite", label: "Vite", keywords: ["build", "tooling"] },
  { value: "ts", label: "TypeScript", keywords: ["types", "javascript"] },
]

const meta = {
  title: "Input/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  args: {
    options,
    placeholder: "Search technology...",
  },
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EmptyState: Story = {
  args: {
    defaultValue: "zzzz",
  },
}

export const SmokeTest: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}
