import CabinCard from "@/app/_components/CofessionCard";
import CofessionCard from "../_components/CofessionCard";
import ConfessionForm from "../_components/ConfessionForm";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
  // CHANGE
  const cabins = [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-8 lg:gap-12 mb-12">
        {/* Text Content */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-accent-400 font-medium">
            Write Your Confession
          </h1>
          <p className="text-primary-200 text-base sm:text-lg">
            This is your moment to speak freely.
            Say what's been on your mind — no filters, no fear.
          </p>
          <p className="text-primary-200 text-base sm:text-lg">
            Your words will be stored permanently on the blockchain.
            Anonymous. Immutable. Real.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <ConfessionForm />
        </div>
      </div>

      {/* Confessions Grid */}

    </div>
  );
}