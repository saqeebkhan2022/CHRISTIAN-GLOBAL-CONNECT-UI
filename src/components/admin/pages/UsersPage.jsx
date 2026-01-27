import React from "react";
import DataTable from "../components/DataTable";

export default function UsersPage() {
  const handleView = (row) => {
    // Add your view logic here
  };

  const handleEdit = (row) => {
    // Add your edit logic here
  };

  const handleDelete = (row) => {
    // Add your delete logic here
  };

  // Define the main color from your design for consistency
  const PRIMARY_COLOR_CLASS = "bg-[#7A1F3D]";
  const HOVER_COLOR_CLASS = "hover:bg-[#5a1a33]";
  const BORDER_COLOR_CLASS = "border-[#7A1F3D]";

  const columns = [
    { label: "Name", key: "name", sortable: true },
    { label: "Gender", key: "gender", sortable: true },
    { label: "Plan", key: "plan", sortable: true },
    { label: "Status", key: "status", sortable: true },
    { label: "Actions", key: "actions", sortable: false },
    // {
    //   label: "Actions",
    //   key: "actions",
    //   align: "right", // This aligns the header text to the right
    //   render: (row) => (
    //     <div className="flex gap-2 justify-end items-center">
    //       {/* VIEW Button: White background, border, and primary text color */}
    //       <button
    //         onClick={() => handleView(row)}
    //         className={`px-3 py-1 bg-white text-sm rounded border ${BORDER_COLOR_CLASS} text-[#7A1F3D] hover:bg-[#F6E7EC]`}
    //       >
    //         View
    //       </button>

    //       {/* EDIT Button: Primary background color */}
    //       <button
    //         onClick={() => handleEdit(row)}
    //         className={`px-3 py-1 ${PRIMARY_COLOR_CLASS} text-white text-sm rounded ${HOVER_COLOR_CLASS}`}
    //       >
    //         Edit
    //       </button>

    //       {/* DELETE Button: Red background color */}
    //       <button
    //         onClick={() => handleDelete(row)}
    //         className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const data = [
    { name: "John Matthew", gender: "Male", plan: "Premium", status: "Active" },
    {
      name: "Mary Elizabeth",
      gender: "Female",
      plan: "Gold",
      status: "Active",
      //   add acttion buttons here
    },
    { name: "David Joseph", gender: "Male", plan: "Basic", status: "Inactive" },
    { name: "David Joseph", gender: "Male", plan: "Basic", status: "Inactive" },
    { name: "David Joseph", gender: "Male", plan: "Basic", status: "Inactive" },
    { name: "David Joseph", gender: "Male", plan: "Basic", status: "Inactive" },
    { name: "David Joseph", gender: "Male", plan: "Basic", status: "Inactive" },

    {
      name: "Anna Rebecca",
      gender: "Female",
      plan: "Premium",
      status: "Active",
    },
    {
      name: "Anna Rebecca",
      gender: "Female",
      plan: "Premium",
      status: "Active",
    },
    {
      name: "Anna Rebecca",
      gender: "Female",
      plan: "Premium",
      status: "Active",
    },
    {
      name: "Anna Rebecca",
      gender: "Female",
      plan: "Premium",
      status: "Active",
    },
    {
      name: "James Cluff",
      gender: "Male",
      plan: "Premium",
      status: "Active",
    },

    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
    { name: "Samuel Thomas", gender: "Male", plan: "Gold", status: "Blocked" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#7A1F3D] mb-6">
        Users Management
      </h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
