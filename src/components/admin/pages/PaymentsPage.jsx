import React from "react";
import DataTable from "../components/DataTable";

const columns = [
  { label: "User", key: "user", sortable: true },
  { label: "Plan", key: "plan", sortable: true },
  {
    label: "Amount",
    key: "amount",
    sortable: true,
    align: "ceter",
  },
  { label: "Date", key: "date", sortable: true },
];

const data = [
  { user: "John Matthew", plan: "Premium", amount: "$99", date: "2024-01-15" },
  { user: "Mary Elizabeth", plan: "Gold", amount: "$149", date: "2024-01-18" },
  { user: "David Joseph", plan: "Basic", amount: "$29", date: "2024-01-20" },
  { user: "Anna Rebecca", plan: "Premium", amount: "$99", date: "2024-01-22" },
  { user: "Samuel Thomas", plan: "Gold", amount: "$149", date: "2024-01-25" },
  { user: "Ruth Naomi", plan: "Basic", amount: "$29", date: "2024-01-27" },
  {
    user: "Michael Andrew",
    plan: "Premium",
    amount: "$99",
    date: "2024-02-01",
  },
  { user: "Sarah Grace", plan: "Gold", amount: "$149", date: "2024-02-04" },
  { user: "Daniel Paul", plan: "Basic", amount: "$29", date: "2024-02-06" },
  { user: "Esther Faith", plan: "Premium", amount: "$99", date: "2024-02-10" },

  { user: "John Matthew", plan: "Premium", amount: "$99", date: "2024-01-15" },
  { user: "Mary Elizabeth", plan: "Gold", amount: "$149", date: "2024-01-18" },
  { user: "David Joseph", plan: "Basic", amount: "$29", date: "2024-01-20" },
  { user: "Anna Rebecca", plan: "Premium", amount: "$99", date: "2024-01-22" },
  { user: "Samuel Thomas", plan: "Gold", amount: "$149", date: "2024-01-25" },
  { user: "Ruth Naomi", plan: "Basic", amount: "$29", date: "2024-01-27" },
  { user: "John Matthew", plan: "Premium", amount: "$99", date: "2024-01-15" },
  { user: "Mary Elizabeth", plan: "Gold", amount: "$149", date: "2024-01-18" },
  { user: "David Joseph", plan: "Basic", amount: "$29", date: "2024-01-20" },
  { user: "Anna Rebecca", plan: "Premium", amount: "$99", date: "2024-01-22" },
  { user: "Samuel Thomas", plan: "Gold", amount: "$149", date: "2024-01-25" },
  { user: "Ruth Naomi", plan: "Basic", amount: "$29", date: "2024-01-27" },
  { user: "John Matthew", plan: "Premium", amount: "$99", date: "2024-01-15" },
  { user: "Mary Elizabeth", plan: "Gold", amount: "$149", date: "2024-01-18" },
  { user: "David Joseph", plan: "Basic", amount: "$29", date: "2024-01-20" },
  { user: "Anna Rebecca", plan: "Premium", amount: "$99", date: "2024-01-22" },
  { user: "Samuel Thomas", plan: "Gold", amount: "$149", date: "2024-01-25" },
  { user: "Ruth Naomi", plan: "Basic", amount: "$29", date: "2024-01-27" },
];

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#7A1F3D] mb-6">
        Payments & Transactions
      </h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
