import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, Loader2 } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
  searchable = true,
  loading = false,
  emptyText = "No records found",
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  /* ================= SEARCH ================= */
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  /* ================= SORT ================= */
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === valB) return 0;
      if (sortDir === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }, [filteredData, sortKey, sortDir]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-white border border-[#E6D3DA] rounded-xl shadow-sm overflow-hidden">
      {/* ================= TOP BAR ================= */}
      {(searchable || pageSizeOptions) && (
        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#E6D3DA]">
          {/* Search */}
          {searchable && (
            <div className="flex items-center gap-2 bg-[#FAF7F8] border border-[#7A1F3D] px-3 py-2 rounded-lg w-full md:w-72">
              <Search className="w-4 h-4 text-[#7A1F3D]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm  rounded px-2 py-1"
              />
            </div>
          )}

          {/* Page Size */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F6E7EC] sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  className={`px-4 py-3 text-left font-semibold text-[#7A1F3D]
                  ${col.sortable ? "cursor-pointer select-none" : ""}
                  ${col.align === "right" ? "text-right" : ""}`}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      sortKey === col.key &&
                      (sortDir === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7A1F3D]" />
                </td>
              </tr>
            ) : paginatedData.length ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-[#E6D3DA]
                  ${idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F8]"}
                  hover:bg-[#F6E7EC] transition`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-gray-700
                      ${col.align === "right" ? "text-right" : ""}`}
                    >
                      {col.render ? col.render(row) : row[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E6D3DA] text-sm">
          <span className="text-gray-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-[#F6E7EC]"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-[#F6E7EC]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
