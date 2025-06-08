import { Car } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-50vh flex items-center justify-center mt-12">
      <div className="flex flex-col justify-center items-center max-w-3xl text-center px-6">
        <h1 className="text-primary text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          Tired of searching for parts for your car?
        </h1>
        <Car className="mb-8" size={200} />
        <p className="text-primary text-lg md:text-xl mb-8 drop-shadow">
          Use our search tool to find exactly what you need.
        </p>
      </div>
    </section>
  );
};

export default Hero;
