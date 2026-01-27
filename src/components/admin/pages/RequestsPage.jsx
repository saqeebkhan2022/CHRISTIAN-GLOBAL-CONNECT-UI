import React from "react";
import DataTable from "../components/DataTable";

const columns = [
  { label: "From", key: "from", sortable: true },
  { label: "To", key: "to", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Date", key: "date", sortable: true },
];

const data = [
  {
    from: "John Matthew",
    to: "Mary Elizabeth",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    from: "David Joseph",
    to: "Anna Rebecca",
    status: "Accepted",
    date: "2024-02-03",
  },
  {
    from: "Samuel Thomas",
    to: "Ruth Naomi",
    status: "Rejected",
    date: "2024-02-05",
  },
  {
    from: "John Matthew",
    to: "Mary Elizabeth",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    from: "David Joseph",
    to: "Anna Rebecca",
    status: "Accepted",
    date: "2024-02-03",
  },
  {
    from: "Samuel Thomas",
    to: "Ruth Naomi",
    status: "Rejected",
    date: "2024-02-05",
  },
  {
    from: "John Matthew",
    to: "Mary Elizabeth",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    from: "David Joseph",
    to: "Anna Rebecca",
    status: "Accepted",
    date: "2024-02-03",
  },
  {
    from: "Samuel Thomas",
    to: "Ruth Naomi",
    status: "Rejected",
    date: "2024-02-05",
  },
  {
    from: "John Matthew",
    to: "Mary Elizabeth",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    from: "David Joseph",
    to: "Anna Rebecca",
    status: "Accepted",
    date: "2024-02-03",
  },
  {
    from: "Samuel Thomas",
    to: "Ruth Naomi",
    status: "Rejected",
    date: "2024-02-05",
  },
  {
    from: "John Matthew",
    to: "Mary Elizabeth",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    from: "David Joseph",
    to: "Anna Rebecca",
    status: "Accepted",
    date: "2024-02-03",
  },
  {
    from: "Samuel Thomas",
    to: "Ruth Naomi",
    status: "Rejected",
    date: "2024-02-05",
  },
];

export default function RequestsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#7A1F3D] mb-6">
        Match Requests
      </h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
