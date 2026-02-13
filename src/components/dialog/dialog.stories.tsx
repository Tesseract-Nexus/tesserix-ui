import type { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, within } from 'storybook/test'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog'
import { Button } from '../button'

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Overlay</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Dialog Showcase</h2>
          <p className="text-sm text-muted-foreground">Modal dialogs for focused user interactions.</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">Basic Dialog</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your
                    data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
                <DialogClose />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">With Form</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent size="md">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      defaultValue="John Doe"
                      className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-right text-sm font-medium">
                      Username
                    </label>
                    <input
                      id="username"
                      defaultValue="@johndoe"
                      className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                <DialogClose />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-4 text-sm font-semibold">Different Sizes</h3>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Small
                  </Button>
                </DialogTrigger>
                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle>Small Dialog</DialogTitle>
                    <DialogDescription>This is a small dialog.</DialogDescription>
                  </DialogHeader>
                  <DialogClose />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Medium
                  </Button>
                </DialogTrigger>
                <DialogContent size="md">
                  <DialogHeader>
                    <DialogTitle>Medium Dialog</DialogTitle>
                    <DialogDescription>This is a medium dialog.</DialogDescription>
                  </DialogHeader>
                  <DialogClose />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Large
                  </Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader>
                    <DialogTitle>Large Dialog</DialogTitle>
                    <DialogDescription>This is a large dialog.</DialogDescription>
                  </DialogHeader>
                  <DialogClose />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description goes here.</DialogDescription>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: /open/i })

    fireEvent.click(openButton)
    const dialog = within(document.body).getByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'Escape' })
    await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    await expect(openButton).toHaveFocus()
  },
}

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Confirm Action</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm your action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /confirm action/i })
    fireEvent.click(trigger)

    const dialog = within(document.body).getByRole('dialog')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(within(dialog).getByText(/confirm your action/i)).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'Escape' })
    await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    await expect(trigger).toHaveFocus()
  },
}
