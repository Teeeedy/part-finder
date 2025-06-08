import { ModeToggle } from "../common/ModeToggle";
import { Wrench } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center text-2xl font-white text-primary font-black">
          <h1>PART-FINDER</h1>
          <Wrench />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
