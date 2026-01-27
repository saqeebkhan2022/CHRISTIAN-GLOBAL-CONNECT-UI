import React from "react";
import DataTable from "../components/DataTable";

const columns = [
  { label: "Plan Name", key: "name", sortable: true },
  { label: "Price", key: "price", sortable: true },
  { label: "Duration", key: "duration" },
  { label: "Status", key: "status", sortable: true },
];

const data = [
  { name: "Basic", price: "₹999", duration: "30 Days", status: "Active" },
  { name: "Premium", price: "₹2999", duration: "90 Days", status: "Active" },
  { name: "Gold", price: "₹4999", duration: "180 Days", status: "Inactive" },
];

export default function PlansPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#7A1F3D] mb-6">
        Subscription Plans
      </h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
