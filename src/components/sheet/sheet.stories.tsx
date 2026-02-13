import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, waitFor, within } from 'storybook/test'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './sheet'
import { Button } from '../button'

const meta = {
  title: 'Overlay/Sheet',
  component: Sheet,
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
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

const ControlledSheetDemo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-3">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open controlled sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>Open state is controlled by the parent story.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <p className="text-sm text-muted-foreground">Sheet open: {open ? 'yes' : 'no'}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Overlay</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Sheet Showcase</h2>
          <p className="text-sm text-muted-foreground">Side panels for navigation and actions.</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">Basic Sheet (Right)</h3>
            <div className="flex justify-center p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        defaultValue="John Doe"
                        className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="username" className="text-right text-sm font-medium">
                        Username
                      </label>
                      <input
                        id="username"
                        defaultValue="@johndoe"
                        className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">Different Sides</h3>
            <div className="flex flex-wrap justify-center gap-4 p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Top
                  </Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Top Sheet</SheetTitle>
                    <SheetDescription>This sheet slides in from the top.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Right
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Right Sheet</SheetTitle>
                    <SheetDescription>This sheet slides in from the right.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bottom
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom Sheet</SheetTitle>
                    <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Left
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Left Sheet</SheetTitle>
                    <SheetDescription>This sheet slides in from the left.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-4 text-sm font-semibold">Navigation Menu</h3>
            <div className="flex justify-center p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Menu</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Browse through the application sections.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    <a
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Team
                    </a>
                    <a
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Settings
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Simple: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description goes here.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: /open/i })

    fireEvent.click(openButton)
    const dialog = await waitFor(() => within(document.body).getByRole('dialog'))
    await waitFor(() => {
      expect(dialog).toBeInTheDocument()
    })

    fireEvent.keyDown(dialog, { key: 'Escape' })
    await waitFor(() => {
      expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(openButton).toHaveFocus()
    })
  },
}

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              defaultValue="John Doe"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              defaultValue="@johndoe"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledSheetDemo />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /open controlled sheet/i })
    fireEvent.click(trigger)

    const dialog = await waitFor(() => within(document.body).getByRole('dialog'))
    await waitFor(() => {
      expect(dialog).toBeInTheDocument()
      expect(canvas.getByText(/sheet open: yes/i)).toBeInTheDocument()
    })

    const closeButtons = within(dialog).getAllByRole('button', { name: /close/i })
    fireEvent.click(closeButtons[0])
    await waitFor(() => {
      expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
      expect(canvas.getByText(/sheet open: no/i)).toBeInTheDocument()
    })
  },
}
