import Link from "next/link";
import { contractAddress } from "../_lib/contract";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-800 text-white py-2 mt-2 fixed bottom-0 right-0 left-0">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="border-t border-accent-700 flex flex-col md:flex-row justify-between items-center">
          <p>
            Made with
            ❤️
            <a href="https://luthfiamrullah.xyz/">luthfi amrullah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, isExternal = false, small = false }) {
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`${small ? 'text-xs' : 'text-sm'} text-accent-300 hover:text-white transition-colors flex items-center`}
      >
        {label}
      </Link>
    </li>
  );
}