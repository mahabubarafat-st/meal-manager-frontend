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
          <div className="text-2xl font-bold tracking-tight">Meal Manager</div>
          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-6">
                <NavigationMenuItem>
                  <Link href="/home" className="hover:text-primary transition-colors">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/recharge" className="hover:text-primary transition-colors">Recharge</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/settings" className="hover:text-primary transition-colors">Settings</Link>
                </NavigationMenuItem>
                {/* Optionally, add a logout or login link */}
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>
        </nav>
        {/* Main Content */}
        <main className="relative z-10 p-10">
          {children}
        </main>
      </body>
    </html>
  );
}