"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-6 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle dark mode"
      type="button"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        {/* Background Logo */}
        <div aria-hidden="true" className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
          <img src="/cuet.png" alt="CUET Logo" className="w-2/3 max-w-2xl opacity-10 object-contain" />
        </div>
        {/* Top Navbar */}
        <nav className="relative z-10 w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <img src="/cuet.png" alt="CUET Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold tracking-tight">Meal Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-6">
                <NavigationMenuItem>
                  <Link href="/home" className="nav-link">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/recharge" className="nav-link">Recharge</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/settings" className="nav-link">Settings</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/login" className="nav-link">Student Login</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/login" className="nav-link">Admin Login</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/reports" className="nav-link">Admin Reports</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/settings" className="nav-link">Admin Settings</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/hall-dashboard" className="nav-link">Hall Dining Dashboard</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
        {/* Main Content */}
        <main className="relative z-10 p-10">
          {children}
        </main>
        <style jsx global>{`
          .nav-link {
            position: relative;
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s;
            font-weight: 500;
            outline: none;
            box-shadow: none;
            text-decoration: none;
          }
          .nav-link:active {
            background: #e0e7ff;
            color: #3730a3;
            transform: scale(0.96);
            box-shadow: 0 2px 8px 0 #a5b4fc55;
          }
          .nav-link:focus {
            box-shadow: 0 0 0 2px #6366f1;
          }
          .nav-link:hover {
            background: #f1f5f9;
            color: #1e293b;
            text-decoration: none;
          }
        `}</style>
      </body>
    </html>
  );
}