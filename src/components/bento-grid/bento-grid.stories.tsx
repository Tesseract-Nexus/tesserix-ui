import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { BentoGrid, BentoGridItem, BentoGridItemMeta, BentoGridItemTitle, BentoGridItemValue } from "./bento-grid"

const meta = {
  title: "Layout/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BentoGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <BentoGrid>
          <BentoGridItem size="hero" className="bg-gradient-to-br from-primary/10 to-card">
            <BentoGridItemTitle>Revenue Pulse</BentoGridItemTitle>
            <BentoGridItemValue>$182,420</BentoGridItemValue>
            <BentoGridItemMeta>Net +14.2% over last 30 days</BentoGridItemMeta>
          </BentoGridItem>
          <BentoGridItem size="sm">
            <BentoGridItemTitle>Incidents</BentoGridItemTitle>
            <BentoGridItemValue>3</BentoGridItemValue>
            <BentoGridItemMeta>All under SLA</BentoGridItemMeta>
          </BentoGridItem>
          <BentoGridItem size="tall">
            <BentoGridItemTitle>Risk Queue</BentoGridItemTitle>
            <BentoGridItemValue>12</BentoGridItemValue>
            <BentoGridItemMeta>Customers needing outreach</BentoGridItemMeta>
          </BentoGridItem>
          <BentoGridItem size="md">
            <BentoGridItemTitle>Campaign Efficiency</BentoGridItemTitle>
            <BentoGridItemValue>4.7x</BentoGridItemValue>
            <BentoGridItemMeta>ROAS rolling average</BentoGridItemMeta>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/revenue pulse/i)).toBeInTheDocument()
    await expect(canvas.getByText(/\$182,420/i)).toBeInTheDocument()
  },
}
