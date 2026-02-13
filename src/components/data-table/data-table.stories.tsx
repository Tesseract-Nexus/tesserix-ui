import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent } from "storybook/test"

import { Badge } from "../badge"
import { DataTable, type DataTableColumn } from "./data-table"
import { skipInChromatic } from "../../../.storybook/chromatic-skip-helper"

interface ProjectRow {
  name: string
  owner: string
  status: "Active" | "Paused" | "Archived"
  tasks: number
}

const rows: ProjectRow[] = [
  { name: "Onboarding Revamp", owner: "Anya", status: "Active", tasks: 18 },
  { name: "Q3 Analytics", owner: "Dev", status: "Paused", tasks: 9 },
  { name: "Design Tokens", owner: "Mina", status: "Active", tasks: 26 },
  { name: "Legacy Migration", owner: "Ravi", status: "Archived", tasks: 4 },
  { name: "Billing V2", owner: "Sara", status: "Active", tasks: 14 },
  { name: "Release Automation", owner: "Leo", status: "Paused", tasks: 11 },
]

const columns: DataTableColumn<ProjectRow>[] = [
  { id: "name", header: "Project", accessor: "name", sortable: true },
  { id: "owner", header: "Owner", accessor: "owner", sortable: true },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    sortable: true,
    render: (row) => (
      <Badge
        variant={
          row.status === "Active"
            ? "success"
            : row.status === "Paused"
              ? "warning"
              : "secondary"
        }
      >
        {row.status}
      </Badge>
    ),
  },
  { id: "tasks", header: "Tasks", accessor: "tasks", sortable: true, className: "text-right" },
]

const meta = {
  title: "DataDisplay/DataTable",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border bg-card p-6 shadow-lg md:p-8">
        <div className="mb-6 space-y-1">
          <p className="text-sm font-medium text-primary">Data Display</p>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">DataTable Showcase</h2>
          <p className="text-sm text-muted-foreground">
            Sortable and filterable table for operational datasets.
          </p>
        </div>
        <DataTable columns={columns} data={rows} defaultPageSize={5} />
      </div>
    </div>
  ),
}

export const FilterAndSort: Story = {
  render: () => <DataTable columns={columns} data={rows} defaultPageSize={5} />,
  play: skipInChromatic(async ({ canvas }) => {
    const search = canvas.getByRole("searchbox")
    fireEvent.change(search, { target: { value: "analytics" } })
    await expect(canvas.getByText(/q3 analytics/i)).toBeInTheDocument()
    await expect(canvas.getByText(/showing 1 of 1 row\(s\)/i)).toBeInTheDocument()

    fireEvent.change(search, { target: { value: "" } })
    const tasksHeader = canvas.getByRole("button", { name: /tasks/i })
    fireEvent.click(tasksHeader)

    const firstCell = canvas.getAllByRole("cell")[0]
    await expect(firstCell).toHaveTextContent(/legacy migration/i)
  }),
}

export const FiltersAndSelection: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={rows}
      defaultPageSize={5}
      enableRowSelection
      columnFiltersEnabled
      getRowId={(row) => row.name}
    />
  ),
  play: skipInChromatic(async ({ canvas }) => {
    const ownerFilter = canvas.getByPlaceholderText(/filter owner/i)
    fireEvent.change(ownerFilter, { target: { value: "anya" } })

    await expect(canvas.getByText(/onboarding revamp/i)).toBeInTheDocument()
    await expect(canvas.getByText(/showing 1 of 1 row\(s\) • 0 selected/i)).toBeInTheDocument()

    const selectRow = canvas.getByRole("checkbox", { name: /select row 1/i })
    fireEvent.click(selectRow)
    await expect(canvas.getByText(/• 1 selected/i)).toBeInTheDocument()
  }),
}

export const KeyboardAndA11y: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={rows}
      defaultPageSize={5}
      enableRowSelection
      columnFiltersEnabled
      getRowId={(row) => row.name}
    />
  ),
  play: skipInChromatic(async ({ canvas }) => {
    const search = canvas.getByRole("searchbox")
    await expect(search).toHaveAttribute("placeholder", "Search rows...")

    fireEvent.change(search, { target: { value: "billing" } })
    await expect(canvas.getByText(/billing v2/i)).toBeInTheDocument()

    const selectAll = canvas.getByRole("checkbox", { name: /select all rows/i })
    fireEvent.click(selectAll)
    await expect(canvas.getByText(/• 1 selected/i)).toBeInTheDocument()

    const ownerHeader = canvas.getByRole("button", { name: /owner/i })
    fireEvent.click(ownerHeader)
    await expect(ownerHeader).toHaveTextContent(/owner/i)
  }),
}
