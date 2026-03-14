"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  GitGraph,
  LogOut,
  Settings,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Journal",
      href: "/journal",
      icon: BookOpen,
    },
    {
      name: "Skill Trees",
      href: "/skills",
      icon: GitGraph,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex font-sans text-zinc-900">
      {/* Fixed Sidebar */}
      <aside className="w-64 border-r border-zinc-100 flex flex-col fixed h-full bg-zinc-50/50">
        <div className="p-8">
          <Link
            href="/dashboard"
            className="text-sm font-bold tracking-widest uppercase"
          >
            Polypath
          </Link>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
            Theme
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-100 space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="flex items-center space-x-3 px-3 py-2.5 w-full text-sm font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Offset by sidebar width) */}
      <main className="flex-1 ml-64 min-h-screen bg-white">
        <div className="p-10 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
