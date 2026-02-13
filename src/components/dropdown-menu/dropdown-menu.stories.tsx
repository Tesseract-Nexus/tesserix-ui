import type { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, within } from 'storybook/test'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from './dropdown-menu'
import { Button } from '../button'

const meta = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Navigation</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">DropdownMenu Showcase</h2>
          <p className="text-sm text-muted-foreground">Contextual menus with actions.</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">Basic Menu</h3>
            <div className="flex justify-center p-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">With Labels & Separators</h3>
            <div className="flex justify-center p-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem disabled>Invite users (coming soon)</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-4 text-sm font-semibold">Multiple Menus</h3>
            <div className="flex justify-center gap-4 p-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    File
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New File</DropdownMenuItem>
                  <DropdownMenuItem>New Window</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Open</DropdownMenuItem>
                  <DropdownMenuItem>Save</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Exit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Undo</DropdownMenuItem>
                  <DropdownMenuItem>Redo</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cut</DropdownMenuItem>
                  <DropdownMenuItem>Copy</DropdownMenuItem>
                  <DropdownMenuItem>Paste</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Zoom In</DropdownMenuItem>
                  <DropdownMenuItem>Zoom Out</DropdownMenuItem>
                  <DropdownMenuItem>Reset Zoom</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Full Screen</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Simple: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: /open/i })

    openButton.focus()
    fireEvent.keyDown(openButton, { key: 'ArrowDown' })

    const menu = within(document.body).getByRole('menu')
    const editItem = within(menu).getByRole('menuitem', { name: /edit/i })
    const duplicateItem = within(menu).getByRole('menuitem', { name: /duplicate/i })

    await expect(editItem).toHaveFocus()
    fireEvent.keyDown(menu, { key: 'ArrowDown' })
    await expect(duplicateItem).toHaveFocus()
  },
}

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          New Tab
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          New Window
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          New Private Window
          <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Print
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
