import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { TimePicker } from "./time-picker"

const meta = {
  title: "Input/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [time, setTime] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-2">
        <TimePicker value={time} onChange={setTime} />
        {time && (
          <p className="text-sm text-muted-foreground">
            Selected: {time.toLocaleTimeString()}
          </p>
        )}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}

export const Format12Hour: Story = {
  render: () => {
    const [time, setTime] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-2">
        <TimePicker value={time} onChange={setTime} format="12h" />
        {time && (
          <p className="text-sm text-muted-foreground">
            Selected: {time.toLocaleTimeString()}
          </p>
        )}
      </div>
    )
  },
}

export const WithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-2">
        <TimePicker value={time} onChange={setTime} showSeconds />
        {time && (
          <p className="text-sm text-muted-foreground">
            Selected: {time.toLocaleTimeString()}
          </p>
        )}
      </div>
    )
  },
}

export const Format12HourWithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-2">
        <TimePicker value={time} onChange={setTime} format="12h" showSeconds />
        {time && (
          <p className="text-sm text-muted-foreground">
            Selected: {time.toLocaleTimeString()}
          </p>
        )}
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [time] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-2">
        <TimePicker value={time} disabled />
      </div>
    )
  },
}
