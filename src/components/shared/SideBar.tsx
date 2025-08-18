import React, { useState } from "react";
import {
  ChartBarIcon,
  Cog6ToothIcon as CogIcon,
  CreditCardIcon,
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Define props type
type SideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

// Navigation item type
type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string | undefined;
};

const SideBar: React.FC<SideBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Navigation items
  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "portfolio",
      label: "Portfolio Section",
      path: "/dashboard/portfolio-section",
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      id: "hero",
      label: "Hero Section",
      path: "/dashboard/portfolio-section",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
    },
    {
      id: "about",
      label: "About Section",
      path: "/dashboard/portfolio-section",
      icon: <CreditCardIcon className="h-5 w-5" />,
    },
    {
      id: "media",
      label: "Media Archives Section",
      path: "/dashboard/portfolio-section",
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/portfolio-section",
      icon: <CogIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-600">
        {sidebarOpen && <h1 className="text-xl font-bold">DashboardPro</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          {sidebarOpen ? "←" : "→"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <Link to={item.path ?? "#"} key={index}>
            <NavItem
              key={item.id}
              icon={item.icon}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              sidebarOpen={sidebarOpen}
            >
              {item.label}
            </NavItem>
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Navigation Item Component
type NavItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  sidebarOpen: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  active,
  onClick,
  sidebarOpen,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 my-1 mx-2 ${
        active ? "bg-indigo-600" : "hover:bg-indigo-600"
      } rounded-lg transition-colors duration-200`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="ml-3">{children}</span>}
    </button>
  );
};

export default SideBar;
