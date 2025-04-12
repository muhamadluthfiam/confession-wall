import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <span className="text-xl font-semibold text-primary-100">
        Confession Wall
      </span>
    </Link>
  );
}

export default Logo;