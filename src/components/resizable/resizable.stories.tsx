import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "storybook/test"

import { Resizable, ResizablePanel, ResizableHandle } from "./resizable"

const meta = {
  title: "Layout/Resizable",
  component: Resizable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Resizable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Resizable className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Right Panel</span>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeTruthy()
  },
}

export const Vertical: Story = {
  render: () => (
    <Resizable direction="vertical" className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Bottom Panel</span>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <Resizable className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
        <div className="flex h-full items-center justify-center p-6 bg-muted/20">
          <span className="text-sm font-medium">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
        <div className="flex h-full items-center justify-center p-6 bg-muted/20">
          <span className="text-sm font-medium">Info Panel</span>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
}

export const Nested: Story = {
  render: () => (
    <Resizable className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
        <Resizable direction="vertical" className="h-full">
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
            <div className="flex h-full items-center justify-center p-6 bg-blue-50 dark:bg-blue-950/20">
              <span className="text-sm font-medium">Top Left</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
            <div className="flex h-full items-center justify-center p-6 bg-green-50 dark:bg-green-950/20">
              <span className="text-sm font-medium">Bottom Left</span>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
        <div className="flex h-full items-center justify-center p-6 bg-purple-50 dark:bg-purple-950/20">
          <span className="text-sm font-medium">Right Panel</span>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
}

export const CodeEditor: Story = {
  render: () => (
    <Resizable className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="flex h-full flex-col bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-2">File Explorer</h3>
          <div className="space-y-1 text-sm">
            <div>src/</div>
            <div className="pl-4">index.ts</div>
            <div className="pl-4">app.tsx</div>
            <div>components/</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={55} minSize={40} maxSize={70}>
        <Resizable direction="vertical" className="h-full">
          <ResizablePanel defaultSize={70} minSize={50} maxSize={90}>
            <div className="flex h-full flex-col p-4">
              <h3 className="text-sm font-semibold mb-2">Editor</h3>
              <pre className="text-xs bg-muted/20 p-2 rounded">
                <code>{`function App() {
  return <div>Hello World</div>
}`}</code>
              </pre>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={10} maxSize={50}>
            <div className="flex h-full flex-col bg-muted/30 p-4">
              <h3 className="text-sm font-semibold mb-2">Terminal</h3>
              <div className="text-xs font-mono">
                <div>$ npm run dev</div>
                <div className="text-green-600">✓ Server started</div>
              </div>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15} maxSize={35}>
        <div className="flex h-full flex-col bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-2">Preview</h3>
          <div className="flex-1 bg-white dark:bg-black rounded border p-2">
            <div className="text-sm">Hello World</div>
          </div>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
}

export const DisabledHandle: Story = {
  render: () => (
    <Resizable className="h-96 w-full rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Left Panel (Fixed)</span>
        </div>
      </ResizablePanel>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Right Panel (Fixed)</span>
        </div>
      </ResizablePanel>
    </Resizable>
  ),
}
