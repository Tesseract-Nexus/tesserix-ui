import * as React from "react"

import { cn } from "../../lib/utils"

type Primitive = string | number | boolean | null | undefined | Date

export interface DataTableColumn<TRow> {
  id: string
  header: React.ReactNode
  accessor?: keyof TRow | ((row: TRow) => Primitive)
  sortable?: boolean
  className?: string
  render?: (row: TRow) => React.ReactNode
}

export interface DataTableProps<TRow extends object>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  columns: DataTableColumn<TRow>[]
  data: TRow[]
  searchPlaceholder?: string
  emptyMessage?: string
  pageSizeOptions?: number[]
  defaultPageSize?: number
}

const toSortableValue = (value: Primitive): string | number => {
  if (value == null) return ""
  if (value instanceof Date) return value.getTime()
  if (typeof value === "boolean") return value ? 1 : 0
  return value
}

const getColumnValue = <TRow extends object>(row: TRow, column: DataTableColumn<TRow>) => {
  if (column.accessor == null) return undefined
  if (typeof column.accessor === "function") return column.accessor(row)
  return (row as Record<string, unknown>)[column.accessor as string] as Primitive
}

const DataTable = <TRow extends object>({
  className,
  columns,
  data,
  searchPlaceholder = "Search rows...",
  emptyMessage = "No matching records found.",
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
  ...props
}: DataTableProps<TRow>) => {
  const [query, setQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(defaultPageSize)

  const searchableColumns = React.useMemo(
    () => columns.filter((column) => column.accessor != null),
    [columns]
  )

  const filteredRows = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return data

    return data.filter((row) =>
      searchableColumns.some((column) => {
        const value = getColumnValue(row, column)
        return String(value ?? "").toLowerCase().includes(normalizedQuery)
      })
    )
  }, [data, query, searchableColumns])

  const sortedRows = React.useMemo(() => {
    if (!sortBy) return filteredRows
    const sortColumn = columns.find((column) => column.id === sortBy)
    if (!sortColumn || sortColumn.accessor == null) return filteredRows

    const sorted = [...filteredRows]
    sorted.sort((a, b) => {
      const aValue = toSortableValue(getColumnValue(a, sortColumn))
      const bValue = toSortableValue(getColumnValue(b, sortColumn))

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
    return sorted
  }, [columns, filteredRows, sortBy, sortDirection])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const clampedPage = Math.min(page, totalPages)

  React.useEffect(() => {
    if (page !== clampedPage) {
      setPage(clampedPage)
    }
  }, [page, clampedPage])

  const paginatedRows = React.useMemo(() => {
    const start = (clampedPage - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [clampedPage, pageSize, sortedRows])

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          role="searchbox"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
          placeholder={searchPlaceholder}
          className={cn(
            "h-10 w-full max-w-sm rounded-lg border border-input bg-background px-3 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        />

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Rows per page
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value))
              setPage(1)
            }}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="relative w-full overflow-auto rounded-lg border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr>
              {columns.map((column) => {
                const isSorted = sortBy === column.id
                const sortable = column.sortable && column.accessor != null
                const nextDirection = isSorted && sortDirection === "asc" ? "desc" : "asc"

                return (
                  <th
                    key={column.id}
                    className={cn(
                      "h-11 px-4 text-left align-middle font-medium text-muted-foreground",
                      column.className
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 hover:text-foreground"
                        onClick={() => {
                          setSortBy(column.id)
                          setSortDirection(nextDirection)
                        }}
                      >
                        <span>{column.header}</span>
                        <span className="text-xs">
                          {isSorted ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="[&_tr:last-child]:border-0">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-muted/40"
                >
                  {columns.map((column) => (
                    <td key={column.id} className={cn("p-4 align-middle", column.className)}>
                      {column.render ? column.render(row) : String(getColumnValue(row, column) ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedRows.length} of {sortedRows.length} row(s)
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={clampedPage === 1}
            className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {clampedPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={clampedPage >= totalPages}
            className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export { DataTable }
