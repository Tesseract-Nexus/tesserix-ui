import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent } from "storybook/test"

import { FileUpload } from "./file-upload"

const FileUploadDemo = () => {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="space-y-3">
      <FileUpload value={files} onValueChange={setFiles} accept=".png,.jpg,.pdf" />
      <p className="text-sm text-muted-foreground">Selected files: {files.length}</p>
    </div>
  )
}

const meta = {
  title: "Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Forms</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">File Upload Showcase</h2>
          <p className="text-sm text-muted-foreground">Drag-and-drop upload area with file list management.</p>
        </div>
        <FileUploadDemo />
      </div>
    </div>
  ),
}

export const SelectAndRemove: Story = {
  render: () => <FileUploadDemo />,
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/upload files/i, { selector: "input" })
    const file = new File(["hello"], "hello.txt", { type: "text/plain" })
    fireEvent.change(input, { target: { files: [file] } })

    await expect(canvas.getByText(/selected files: 1/i)).toBeInTheDocument()
    const removeButton = canvas.getByRole("button", { name: /remove hello\.txt/i })
    fireEvent.click(removeButton)
    await expect(canvas.getByText(/selected files: 0/i)).toBeInTheDocument()
  },
}

