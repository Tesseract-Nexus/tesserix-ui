import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer"
import { Button } from "../button"
import { Input } from "../input"
import { Label } from "../label"

const meta = {
  title: "Overlay/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a mobile-optimized drawer that slides up from the bottom by default.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm">
            Drawers are perfect for mobile-first experiences. They provide a natural bottom-sheet interaction pattern.
          </p>
        </div>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}

export const FromLeft: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open from Left</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Drawer sliding in from the left, perfect for navigation menus.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromRight: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open from Right</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Settings Panel</DrawerTitle>
          <DrawerDescription>
            Configure your preferences.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromTop: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open from Top</Button>
      </DrawerTrigger>
      <DrawerContent side="top">
        <DrawerHeader>
          <DrawerTitle>Notification</DrawerTitle>
          <DrawerDescription>
            You have a new message!
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm">
            This drawer slides down from the top, useful for notifications or alerts.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromBottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open from Bottom</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Mobile Action Sheet</DrawerTitle>
          <DrawerDescription>
            Choose an action from the list below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Share
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Download
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive">
            Delete
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div className="space-y-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Open Controlled Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer's state is controlled externally.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm">
                The open state can be managed programmatically.
              </p>
            </div>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <div className="text-sm text-muted-foreground">
          Drawer is {open ? "open" : "closed"}
        </div>
      </div>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setOpen(false)
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>Add Item</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add New Item</DrawerTitle>
            <DrawerDescription>
              Fill in the details for the new item.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Name</Label>
                <Input id="item-name" placeholder="Item name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-description">Description</Label>
                <Input id="item-description" placeholder="Item description" />
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Add Item</Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    )
  },
}
