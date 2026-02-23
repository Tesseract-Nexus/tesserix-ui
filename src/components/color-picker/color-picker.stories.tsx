import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { ColorPicker } from "./color-picker"

const meta = {
  title: "Input/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [color, setColor] = React.useState("#3b82f6")
    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">{color}</span>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}

export const WithoutInput: Story = {
  render: () => {
    const [color, setColor] = React.useState("#ef4444")
    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} showInput={false} />
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">{color}</span>
        </div>
      </div>
    )
  },
}

export const PresetColors: Story = {
  render: () => {
    const [color, setColor] = React.useState("#8b5cf6")
    const presets = [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
    ]

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => setColor(preset)}
              className="h-8 w-8 rounded border-2 hover:scale-110 transition-transform"
              style={{
                backgroundColor: preset,
                borderColor: preset === color ? "#000" : "transparent",
              }}
              aria-label={`Select ${preset}`}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [color] = React.useState("#6366f1")
    return <ColorPicker value={color} disabled />
  },
}
