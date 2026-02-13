import type { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, waitFor, within } from 'storybook/test'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Button } from '../button'

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Overlay</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Popover Showcase</h2>
          <p className="text-sm text-muted-foreground">Contextual information and actions.</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">Basic Popover</h3>
            <div className="flex justify-center p-8">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="width" className="text-sm">
                          Width
                        </label>
                        <input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="height" className="text-sm">
                          Height
                        </label>
                        <input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">Different Positions</h3>
            <div className="grid grid-cols-3 gap-8 p-12">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Top</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                  <p className="text-sm">This popover appears on top.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Right</Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                  <p className="text-sm">This popover appears on the right.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                  <p className="text-sm">This popover appears on the bottom.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Left</Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <p className="text-sm">This popover appears on the left.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Start</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <p className="text-sm">Aligned to start.</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">End</Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <p className="text-sm">Aligned to end.</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-4 text-sm font-semibold">With Form</h3>
            <div className="flex justify-center p-8">
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Settings</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Settings</h4>
                      <p className="text-sm text-muted-foreground">Configure your preferences.</p>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="notifications" className="flex items-center gap-2 text-sm font-medium">
                        <input type="checkbox" id="notifications" className="h-4 w-4" />
                        Enable notifications
                      </label>
                    </div>
                    <Button className="w-full" size="sm">
                      Save
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Simple: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Popover content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: /open/i })

    fireEvent.click(openButton)
    await waitFor(() => {
      expect(within(document.body).getByText(/popover content goes here/i)).toBeInTheDocument()
    })

    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => {
      expect(within(document.body).queryByText(/popover content goes here/i)).not.toBeInTheDocument()
    })
  },
}

export const WithActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Quick Actions</h4>
          <div className="space-y-1">
            <button className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted">
              Edit
            </button>
            <button className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted">
              Duplicate
            </button>
            <button className="w-full rounded-md px-2 py-1.5 text-left text-sm text-destructive hover:bg-muted">
              Delete
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
