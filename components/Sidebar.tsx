"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Users, Settings, FileText } from "lucide-react";

const navItems = [
  { name: "Audit Logs", href: "/dashboard", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
  { name: "Admin", href: "/admin", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 flex flex-col shadow-lg border-r-2 border-gray-300">
      {/* Logo / Header */}
      <div className="p-6 text-2xl font-bold border-b-2 border-gray-300">
        Dashboard
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-gray-300 text-sm">
        © 2025 Your App
      </div>
    </aside>
  );
}
