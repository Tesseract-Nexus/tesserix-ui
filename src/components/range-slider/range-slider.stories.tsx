import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { RangeSlider } from "./range-slider"

const meta = {
  title: "Input/RangeSlider",
  component: RangeSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([25, 75])
    return (
      <div className="w-96 space-y-4">
        <RangeSlider value={range} onChange={setRange} />
        <p className="text-sm text-center text-muted-foreground">
          Range: {range[0]} - {range[1]}
        </p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}

export const CustomRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([200, 800])
    return (
      <div className="w-96 space-y-4">
        <RangeSlider min={0} max={1000} value={range} onChange={setRange} />
        <p className="text-sm text-center text-muted-foreground">
          Range: {range[0]} - {range[1]}
        </p>
      </div>
    )
  },
}

export const WithStep: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([20, 80])
    return (
      <div className="w-96 space-y-4">
        <RangeSlider min={0} max={100} step={10} value={range} onChange={setRange} />
        <p className="text-sm text-center text-muted-foreground">
          Range: {range[0]} - {range[1]} (Step: 10)
        </p>
      </div>
    )
  },
}

export const PriceRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([50, 500])
    return (
      <div className="w-96 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={range}
            onChange={setRange}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>
      </div>
    )
  },
}

export const WithoutLabels: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([30, 70])
    return (
      <div className="w-96">
        <RangeSlider value={range} onChange={setRange} showLabels={false} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [range] = React.useState<[number, number]>([40, 60])
    return (
      <div className="w-96">
        <RangeSlider value={range} disabled />
      </div>
    )
  },
}
