import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent } from "storybook/test"

import { NumberInput } from "./number-input"

const NumberInputDemo = () => {
  const [quantity, setQuantity] = React.useState(2)
  return (
    <div className="space-y-3">
      <NumberInput value={quantity} onValueChange={setQuantity} min={0} max={10} step={1} />
      <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
    </div>
  )
}

const meta = {
  title: "Forms/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Forms</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Number Input Showcase</h2>
          <p className="text-sm text-muted-foreground">Numeric input with step controls and boundary constraints.</p>
        </div>
        <NumberInputDemo />
      </div>
    </div>
  ),
}

export const StepAndClamp: Story = {
  render: () => <NumberInputDemo />,
  play: async ({ canvas }) => {
    const increment = canvas.getByRole("button", { name: /increase value/i })
    const decrement = canvas.getByRole("button", { name: /decrease value/i })
    const input = canvas.getByRole("textbox")

    fireEvent.click(increment)
    await expect(canvas.getByText(/quantity: 3/i)).toBeInTheDocument()

    fireEvent.change(input, { target: { value: "99" } })
    fireEvent.keyDown(input, { key: "Enter" })
    await expect(canvas.getByText(/quantity: 10/i)).toBeInTheDocument()

    for (let i = 0; i < 12; i += 1) {
      fireEvent.click(decrement)
    }
    await expect(canvas.getByText(/quantity: 0/i)).toBeInTheDocument()
  },
}
