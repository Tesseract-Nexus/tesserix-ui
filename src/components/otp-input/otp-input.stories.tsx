import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent } from "storybook/test"

import { OTPInput } from "./otp-input"

const OTPDemo = () => {
  const [code, setCode] = React.useState("")
  return (
    <div className="space-y-3">
      <OTPInput value={code} onValueChange={setCode} />
      <p className="text-sm text-muted-foreground">Code: {code || "empty"}</p>
    </div>
  )
}

const meta = {
  title: "Forms/OTPInput",
  component: OTPInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OTPInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Forms</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">OTP Input Showcase</h2>
          <p className="text-sm text-muted-foreground">One-time code entry with keyboard and paste support.</p>
        </div>
        <OTPDemo />
      </div>
    </div>
  ),
}

export const TypeAndPaste: Story = {
  render: () => <OTPDemo />,
  play: async ({ canvas }) => {
    const first = canvas.getByRole("textbox", { name: /digit 1/i })
    fireEvent.change(first, { target: { value: "1" } })

    const second = canvas.getByRole("textbox", { name: /digit 2/i })
    fireEvent.paste(second, {
      clipboardData: {
        getData: () => "234567",
      },
    } as unknown as ClipboardEvent)

    await expect(canvas.getByText(/code: 234567/i)).toBeInTheDocument()
  },
}

