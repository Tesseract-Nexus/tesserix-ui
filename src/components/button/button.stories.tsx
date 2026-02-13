import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from './button'

const StorySection = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => (
  <section className="rounded-2xl border bg-card p-6 shadow-sm">
    <div className="mb-4 space-y-1">
      <h3 className="text-sm font-semibold tracking-tight text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {children}
  </section>
)

const meta = {
  title: 'Forms/Button',
  component: Button,
  args: {
    onClick: fn(),
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Change the default rendered element for the one passed as a child',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Save Changes',
    variant: 'default',
  },
  render: (args) => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-3xl border bg-card p-6 shadow-lg md:p-8">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Action System</p>
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Buttons Showcase</h2>
            </div>
            <p className="text-sm text-muted-foreground">Balanced states for primary, secondary, and utility actions.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <StorySection
              title="Primary Actions"
              description="Use for key flows and strong confirmation events."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button {...args}>Save Changes</Button>
                <Button variant="secondary">Preview</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </StorySection>

            <StorySection
              title="Subtle Utilities"
              description="Low-emphasis actions that still align with the visual language."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="ghost">Duplicate</Button>
                <Button variant="link">View Details</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </StorySection>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: /save changes/i })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
}

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

export const Icon: Story = {
  args: {
    children: '✓',
    size: 'icon',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled/i })
    await expect(button).toBeDisabled()
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
