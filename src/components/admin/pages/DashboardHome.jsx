// import React from "react";
// import { Users, HeartHandshake, Crown, IndianRupee } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// /* ================= MOCK DATA ================= */
// const revenueData = [
//   { month: "Jan", revenue: 45000 },
//   { month: "Feb", revenue: 62000 },
//   { month: "Mar", revenue: 78500 },
//   { month: "Apr", revenue: 98500 },
// ];

// const userGrowthData = [
//   { month: "Jan", users: 820 },
//   { month: "Feb", users: 980 },
//   { month: "Mar", users: 1120 },
//   { month: "Apr", users: 1245 },
// ];

// export default function DashboardHome() {
//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* Heading */}
//       <h1 className="text-xl md:text-2xl font-semibold text-[#7A1F3D]">
//         Dashboard Overview
//       </h1>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//         <StatCard title="Total Users" value="1,245" icon={Users} />
//         <StatCard title="New Requests" value="87" icon={HeartHandshake} />
//         <StatCard title="Premium Members" value="312" icon={Crown} />
//         <StatCard title="Monthly Revenue" value="₹98,500" icon={IndianRupee} />
//       </div>

//       {/* ================= CHARTS ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//         {/* Revenue Chart */}
//         <div className="bg-white p-4 md:p-6 rounded-xl border border-[#E6D3DA] shadow-sm">
//           <h3 className="text-base md:text-lg font-semibold text-[#7A1F3D] mb-4">
//             Monthly Revenue
//           </h3>

//           <div className="h-[220px] md:h-[260px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={revenueData}>
//                 <XAxis dataKey="month" />
//                 <YAxis width={40} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#7A1F3D"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* User Growth Chart */}
//         <div className="bg-white p-4 md:p-6 rounded-xl border border-[#E6D3DA] shadow-sm">
//           <h3 className="text-base md:text-lg font-semibold text-[#7A1F3D] mb-4">
//             User Growth
//           </h3>

//           <div className="h-[220px] md:h-[260px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={userGrowthData}>
//                 <XAxis dataKey="month" />
//                 <YAxis width={40} />
//                 <Tooltip />
//                 <Bar
//                   dataKey="users"
//                   fill="#7A1F3D"
//                   radius={[6, 6, 0, 0]}
//                   barSize={36}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= STAT CARD ================= */
// const StatCard = ({ title, value, icon: Icon }) => (
//   <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-[#F1DCE3] p-5">
//     {/* Decorative Accent */}
//     <div className="absolute top-0 right-0 h-20 w-20 bg-[#F6E7EC] rounded-full -translate-y-1/2 translate-x-1/2" />

//     <div className="relative z-10 flex items-center justify-between">
//       {/* Text */}
//       <div>
//         <p className="text-xs font-medium text-gray-500 tracking-wide">
//           {title}
//         </p>
//         <h2 className="mt-1 text-2xl font-extrabold text-[#7A1F3D]">{value}</h2>
//       </div>

//       {/* Icon */}
//       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A1F3D] text-white shadow-sm">
//         <Icon size={22} />
//       </div>
//     </div>
//   </div>
// );

import React from "react";
import { Users, HeartHandshake, Crown, IndianRupee } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

/* ================= MOCK DATA ================= */
const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 62000 },
  { month: "Mar", revenue: 78500 },
  { month: "Apr", revenue: 98500 },
];

const userGrowthData = [
  { month: "Jan", users: 820 },
  { month: "Feb", users: 980 },
  { month: "Mar", users: 1120 },
  { month: "Apr", users: 1245 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-xl sm:text-2xl font-bold text-[#7A1F3D]">
        Dashboard Overview
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="1,245" icon={Users} />
        <StatCard title="New Requests" value="87" icon={HeartHandshake} />
        <StatCard title="Premium Members" value="312" icon={Crown} />
        <StatCard title="Monthly Revenue" value="₹98,500" icon={IndianRupee} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1DCE3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7A1F3D"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* User Growth Chart */}
        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1DCE3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#7A1F3D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F1DCE3] shadow-md p-5">
    {/* Decorative accent */}
    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#F6E7EC]" />

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#7A1F3D]">{value}</h2>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A1F3D] text-white shadow">
        <Icon size={22} />
      </div>
    </div>
  </div>
);

/* ================= CHART CARD ================= */
const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-[#E6D3DA] shadow-sm p-5">
    <h3 className="text-base font-semibold text-[#7A1F3D] mb-4">{title}</h3>
    {children}
  </div>
);
