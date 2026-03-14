/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  GitGraph,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Journal", href: "/journal", icon: BookOpen },
    { name: "Skill Trees", href: "/skills", icon: GitGraph },
  ];

  // Reusable Sidebar Content to avoid duplication
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-900/10">
      <div className="p-8">
        <Link
          href="/dashboard"
          className="text-sm font-bold tracking-widest uppercase"
        >
          Polypath
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
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

      <div className="p-4 border-t border-zinc-100 space-y-1">
        <Link
          href="/settings"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center space-x-3 px-3 py-2.5 w-full text-sm font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-zinc-900">
      
      {/* Mobile Header (Only visible on small screens) */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-100 bg-white sticky top-0 z-50">
        <Link href="/dashboard" className="text-sm font-bold tracking-widest uppercase">
          Polypath
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-zinc-500 hover:text-zinc-900"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Desktop Sidebar (Only visible on large screens) */}
      <aside className="hidden lg:flex w-64 border-r border-zinc-100 flex-col fixed h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          {/* Sidebar Drawer */}
          <aside className="relative w-72 h-full bg-white border-r border-zinc-100 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 min-h-screen bg-white transition-all duration-300 ${isMobileMenuOpen ? 'overflow-hidden' : ''} lg:ml-64`}>
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}