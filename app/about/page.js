import Image from "next/image";
// import image1 from "@/public/about-1.jpg";
// import image2 from "@/public/about-2.jpg";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-accent-400 font-medium">
            What Is Confession Wall?
          </h1>
          <p className="text-primary-200 text-base sm:text-lg mb-4">
            Confession Wall is a decentralized space where anyone can speak freely — no usernames, no data tracking, just pure expression.
            Built on the blockchain, every message you send is stored immutably. It’s a safe space for your thoughts, emotions, and truths.
            We believe in freedom of speech, anonymity, and the power of community.
          </p>
          <p className="text-primary-200 text-base sm:text-lg">
            🚀 Join us in building a wall where words matter — and everyone is welcome
          </p>
        </div>
      </div>
    </div>
  );
}