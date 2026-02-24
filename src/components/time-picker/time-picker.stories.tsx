import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "storybook/test"

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
    const canvas = within(canvasElement)
    const hours = canvas.getByLabelText("Hours")
    const minutes = canvas.getByLabelText("Minutes")
    fireEvent.change(hours, { target: { value: "14" } })
    fireEvent.change(minutes, { target: { value: "35" } })
    await waitFor(() => {
      expect(canvas.getByText(/Selected:/i)).toBeInTheDocument()
    })
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle AM/PM" })
    fireEvent.click(toggle)
    await waitFor(() => {
      expect(toggle).toHaveTextContent(/am|pm/i)
    })
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    fireEvent.change(canvas.getByLabelText("Seconds"), { target: { value: "45" } })
    await waitFor(() => {
      expect(canvas.getByText(/Selected:/i)).toBeInTheDocument()
    })
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    fireEvent.change(canvas.getByLabelText("Hours"), { target: { value: "11" } })
    fireEvent.change(canvas.getByLabelText("Minutes"), { target: { value: "58" } })
    fireEvent.change(canvas.getByLabelText("Seconds"), { target: { value: "59" } })
    fireEvent.click(canvas.getByRole("button", { name: "Toggle AM/PM" }))
    await waitFor(() => {
      expect(canvas.getByText(/Selected:/i)).toBeInTheDocument()
    })
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByLabelText("Hours")).toBeDisabled()
    expect(canvas.getByLabelText("Minutes")).toBeDisabled()
  },
}
