import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Menu,
  Users,
  LayoutDashboard,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import bg from "../../assets/bg.png";

import { GrPlan } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";

/* ================= NAV CONFIG ================= */
const NAV_LINKS = [
  {
    section: "Overview",
    links: [
      {
        label: "Dashboard",
        url: "/dashboard",
        icon: MdDashboard,
      },
    ],
  },
  {
    section: "Management",
    links: [
      {
        label: "Users",
        url: "/dashboard/users",
        icon: FaUsers,
      },
      {
        label: "Requests",
        url: "/dashboard/requests",
        icon: Users,
      },
    ],
  },
  {
    section: "Monetization",
    links: [
      {
        label: "Plans",
        url: "/dashboard/plans",
        icon: FaTasks,
      },
      {
        label: "Payments",
        url: "/dashboard/payments",
        icon: FaHandHoldingDollar,
      },
    ],
  },
  {
    section: "System",
    links: [
      {
        label: "Settings",
        url: "/dashboard/settings",
        icon: IoMdSettings,
      },
    ],
  },
];

export default function MatrimonialDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarWidth = sidebarOpen ? "w-64" : "w-20";
  const mainMargin = sidebarOpen ? "ml-64" : "ml-20";

  const navLinkClass = ({ isActive }) =>
    `flex items-center rounded-xl transition-all duration-200
     ${sidebarOpen ? "px-4 py-3" : "justify-center py-3"}
     ${
       isActive
         ? "bg-white text-[#7A1F3D] shadow-sm font-semibold"
         : "text-[#F6E7EC] hover:bg-[#8E2B4B]"
     }`;

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#FAF7F8] flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-[#7A1F3D] transition-all duration-300 z-30`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#8E2B4B]">
          {sidebarOpen && (
            <span className="text-lg font-semibold tracking-wide text-white">
              {/* CHRISTIAN GLOBAL CONNECT */}
              ADMIN PANEL
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white hover:bg-[#8E2B4B]"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {NAV_LINKS.map((group) => (
            <div key={group.section}>
              {sidebarOpen && (
                <p className="text-xs uppercase tracking-wider text-white mb-2 px-2">
                  {group.section}
                </p>
              )}

              <div className="space-y-1">
                {group.links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={navLinkClass}
                    >
                      <Icon
                        className={`w-5 h-5 ${sidebarOpen ? "mr-3" : ""}`}
                      />
                      {sidebarOpen && item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-xl bg-white text-[#7A1F3D] hover:bg-[#F6E7EC] transition
              ${sidebarOpen ? "px-4 py-3" : "justify-center py-3"}`}
          >
            <LogOut className={`w-5 h-5 ${sidebarOpen ? "mr-3" : ""}`} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className={`flex-1 ${mainMargin} transition-all duration-300`}>
        {/* Header */}
        <header
          className={`fixed top-0 right-0 h-16 bg-white border-b border-[#E6D3DA] flex items-center px-6 z-20 transition-all duration-300
          ${sidebarOpen ? "left-64" : "left-20"}`}
        >
          <h2 className="text-lg font-semibold text-[#7A1F3D]">
            Matrimonial Admin Panel
          </h2>
        </header>

        {/* Content */}
        <main
          className="pt-20 p-8"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
