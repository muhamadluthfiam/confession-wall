"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-50 text-lg relative">
      {/* Hamburger button for mobile */}
      <div className="md:hidden flex items-center justify-end">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-950 text-white p-6 transform transition-transform duration-300 ease-in-out z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        {/* Close button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="space-y-6 text-md">
          <li>
            <Link
              href="/create"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Create
            </Link>
          </li>
          <li>
            <Link
              href="/confessions"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Confessions
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <ConnectButton />
          </li>
        </ul>
      </div>

      {/* Desktop navigation */}
      <ul className="hidden md:flex gap-16 items-center">
        <li>
          <Link href="/create" className="hover:text-accent-400 transition-colors">
            Create
          </Link>
        </li>
        <li>
          <Link href="/confessions" className="hover:text-accent-400 transition-colors">
            Confessions
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li className="z-[9999]">
          <ConnectButton
            modalSize="compact"
            label="Sign in"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            showRecentTransactions={true}
          />
        </li>
      </ul>
    </nav>
  );
}
