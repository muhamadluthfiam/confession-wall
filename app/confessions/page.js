import CabinCard from "@/app/_components/CofessionCard";
import CofessionCard from "../_components/CofessionCard";
import ConfessionForm from "../_components/ConfessionForm";

export const metadata = {
  title: "Cofessions",
};

export default function Page() {

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-accent-400 font-medium">
            Share Your Thoughts Anonymously
          </h1>
          <p className="text-primary-200 text-base sm:text-lg mb-4">
            Everyone has something they wish they could say — now you can.
            Drop your anonymous confession and let your voice be heard, without fear or judgment.
            Be real. Be honest. Be free.
          </p>
          <p className="text-primary-200 text-base sm:text-lg">
            💬 Ready to confess? Your message lives on the blockchain, unfiltered and uncensored.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <CofessionCard />
        </div>
      </div>

      {/* Confessions Grid */}

    </div>
  );
}